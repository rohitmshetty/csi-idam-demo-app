const express = require('express')
const path = require('path')
const axios = require('axios');
const jwt_decode = require("jwt-decode");

var IDAM_CONFIG = require('../website/idam-config.json');

const app = express()
const port = 5000

app.use(express.static('website'));

app.get('/processAuthCode/:code', async (req, res) => {
    const tokenEndpoint = IDAM_CONFIG.idamUrl + "oauth2/token"

    payload = {
        client_id: IDAM_CONFIG.applicationClientId,
        grant_type: "authorization_code",
        code: req.params.code,
        redirect_uri: "http://localhost:5000/login-redirect/login-redirect.html",
        client_secret: IDAM_CONFIG.applicationClientSecret
    }
	console.info('applicationClientId: '+IDAM_CONFIG.applicationClientId);
    try {
        const response = await axios.post(tokenEndpoint, payload, {
            proxy: false,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        res.send({
            idToken: response.data.id_token,
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            userInfo:  jwt_decode(response.data.id_token)
        })

    } catch (e) {
        console.error(e);
        res.status(500);
        if(e.code || e.response.status === 403){
            res.send('Probably the proxy setting is not right.')
        }else if(e.response.status === 500){
            res.send('Probably the auth code was used multiple times.');
        }else{
            res.send(e.response.data.error_description)
        }
    }



});

app.listen(port, () => console.info(`The hello world app is available at http://localhost:5000/login/login.html`))


