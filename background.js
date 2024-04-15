(function() {
    const tabStorage = {};
    const networkFilters = {
        urls: [
            "https://*/*",
            "http://*/*"
        ]
    };
    
    chrome.webRequest.onBeforeRequest.addListener((details) => {
        const { tabId, requestId } = details;
        if (!tabStorage.hasOwnProperty(tabId)) {
            return;
        }

        tabStorage[tabId].requests[requestId] = {
            requestId: requestId,
            url: details.url,
            method: details.method,
            startTime: details.timeStamp,
            status: 'pending'
        };
        //console.log(tabStorage[tabId].requests[requestId]);
        
        
        // Retrieve webhook URL from config

        chrome.storage.sync.get(['webhookUri'], function(result) {
          console.log('webhookUri is: ' + result.webhookUri);
          let storedValue = result.webhookUri;

          chrome.identity.getProfileUserInfo(function(userInfo) {
            if(userInfo.email) {
              // Only send a webhook if we have a user's e-amil
              console.log("User's email: " + userInfo.email);
            
              var date = new Date(details.timeStamp);
              var ts = date.toISOString();
              json = JSON.stringify({
                timestamp: ts,
                user: userInfo.email,
                app_name: "Webhook URL Observer",
                url: details.url,
                method: details.method
              });
              console.log(json);

              fetch(result.webhookUri, {
                method: 'post',
                headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
                },
                body: json
              })

              .then(function (response) {
                console.log(response);
                return response;
              })
              .then(function (result) {
                console.log(result);
              })
              .catch (function (error) {
                console.log('Request failed', error);
              });
            
            }
            else {
              console.error("Failed to get user's email");
              return null;
            }
          });
        });
        
      
        
    }, networkFilters);

    chrome.tabs.onActivated.addListener((tab) => {
        const tabId = tab ? tab.tabId : chrome.tabs.TAB_ID_NONE;
        if (!tabStorage.hasOwnProperty(tabId)) {
            tabStorage[tabId] = {
                id: tabId,
                requests: {},
                registerTime: new Date().getTime()
            };
        }
    });
    chrome.tabs.onRemoved.addListener((tab) => {
        const tabId = tab.tabId;
        if (!tabStorage.hasOwnProperty(tabId)) {
            return;
        }
        tabStorage[tabId] = null;
    });
}());