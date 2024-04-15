// Saves options to chrome.storage
const saveOptions = () => {
  const url = document.getElementById('url').value;
  //const likesColor = document.getElementById('like').checked;

  chrome.storage.sync.set(
    { webhookUri: url},
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(() => {
        status.textContent = '';
      }, 750);
    }
  );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get(
    { webhookUri: '<Your Webhook URL>'},
    (items) => {
      document.getElementById('url').value = items.webhookUri;
      //document.getElementById('like').checked = items.likesColor;
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);