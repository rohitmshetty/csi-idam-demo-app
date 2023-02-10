let IDAM_CONFIG;


document.addEventListener("DOMContentLoaded", ()=>{
    loadConfigFile();
    document.getElementById('login-button').addEventListener('click', redirectUserToIdamLoginPage)
});

function loadConfigFile(){
    let httpRequest = new XMLHttpRequest(); // asynchronous request
    httpRequest.open("GET", "../idam-config.json", true);
    httpRequest.addEventListener("readystatechange", function() {
        if (this.readyState === this.DONE) {
            IDAM_CONFIG = JSON.parse(this.response);
        }
    });
    httpRequest.send();
}

function redirectUserToIdamLoginPage(){
    const requiredParams = {
        client_id: IDAM_CONFIG.applicationClientId,
        response_type: 'code',
        scope: 'openid+email+profile',
        redirect_uri: 'http://localhost:5000/login-redirect/login-redirect.html',
        idamLoginURL: IDAM_CONFIG.idamUrl,
        authMethod: 'oauth2/authorize',
        state: 'ExampleStateString'
    }
    const idamURL = `${requiredParams.idamLoginURL}/${requiredParams.authMethod}?client_id=${requiredParams.client_id}&response_type=${requiredParams.response_type}&scope=${requiredParams.scope}&redirect_uri=${requiredParams.redirect_uri}&state=${requiredParams.state}`
    window.location.href = idamURL;
}



