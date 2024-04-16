# Webhook URL Observer Chrome Extension


## Overview
This experiment was born from a desire to get full URL telemetry into my SIEM (Chronicle SecOps), but not wanting to go through the drama of setting up Squid Proxy. With this extension, you can configure it to send a webhook for each URL that is visited. To experiment, you can use a free service like `webhook.site`.

## Pre-requisities
- You must [sign-in](https://support.google.com/chrome/answer/185277) to the Chrome browser. This is required for generating the telemetry
- Comfortable with loading unpacked extensions within the browser.

## Installation
1. Download the code from this repo.
2. Access the extensions page by navigating to `chrome://extensions/`
3. Click on `Load unpacked` and choose the folder where you unzipped the contents of the repo
4. Configure the webhook URL to send to under the extensions options.
5. Once saved, as long as your are signed in and the webhook URL is configured, you should start instantly receiving telemetry.
