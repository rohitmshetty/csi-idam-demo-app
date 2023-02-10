let code;

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById('back-to-login').style.display = 'none';
    document.getElementById('user-info').style.display = 'none';
    document.getElementById('load-user-info').addEventListener('click', processIdamAuthCode)
    readIdamAuthCode();
});

function processIdamAuthCode(){
    document.getElementById('back-to-login').style.display = 'flex';
    document.getElementById('load-user-info').style.display = 'none';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = handleCodeExchange;
    xhttp.open("GET", "http://localhost:5000/processAuthCode/" + code, true);
    xhttp.send();
}

function handleCodeExchange() {
    if (this.readyState == 4 && this.status == 200) {
        displayUserInformation(JSON.parse(this.response));
    }else if(this.status === 500){
        displayError(this.response)
    }
}

function displayUserInformation(loggedInUserInfo){
    document.getElementById('error').style.display = 'none';
    document.getElementById('user-info').style.display = 'flex';
    document.getElementById('given-name').textContent = loggedInUserInfo.userInfo.given_name;
    document.getElementById('family-name').textContent = loggedInUserInfo.userInfo.family_name;
    document.getElementById('org-name').textContent = loggedInUserInfo.userInfo.organizationName;
    document.getElementById('email').textContent = loggedInUserInfo.userInfo.email;
    document.getElementById('id-token').textContent = loggedInUserInfo.idToken;
    document.getElementById('access-token').textContent = loggedInUserInfo.accessToken;
    document.getElementById('refresh-token').textContent = loggedInUserInfo.refreshToken;
}

function displayError(errorResponse){
    document.getElementById('error').style.display = 'flex';
    document.getElementById('user-info').style.display = 'none';
    document.getElementById('error').textContent = errorResponse;
}

function readIdamAuthCode(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    code = urlParams.get('code')
    document.getElementById('code').textContent = code;
}

