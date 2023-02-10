### Requirements
- node (14.15 version was used for development)
- npm (6.14 version was used for development)
- IDAM application
- This url needs to be in the redirect url whitelist in IDAM ***http://localhost:5000/login-redirect/login-redirect.html***
- IDAM user for the log in


### Proxy setting
You may need to configure proxy options, you can do that at ***src/app.js/line 26***

### Run the following commands
- npm install
- npm start

### Update idam-config.json

You have to change, the ***applicationClientId*** and ***applicationClientSecret*** in the ***website/idam-config.json*** file. You get these IDs from IDAM's application management.

## Starting the demo application

Run `npm run start` for the server to start. Navigate to `http://localhost:5000/login/login.html`, after that follow the instructions on the site.

## Overview of the demo application

Demo application works like this:

* First the frontend redirects the user to the IDAM login page.
* User enters the username/password or uses SSO login.
* IDAM redirects the user to the ***login-redirect*** page and provides a ***code***.
* The frontend sends this code to the backend.
* Backend exchanges this ***code*** for ID, Access and Refresh tokens.
* Backend parses the ID token, and returns them to the frontend.

