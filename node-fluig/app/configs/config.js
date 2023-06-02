const rp = require('request-promise-native');
const CONSUMER_KEY = process.env.CONSUMER_KEY
const CONSUMER_SECRET = process.env.CONSUMER_SECRET
const TOKEN = process.env.TOKEN
const TOKEN_SECRET = process.env.TOKEN_SECRET
const oauth_prod = {
    consumer_key: "98d79dfe-cd97-41ba-a22b-827e8f67169c",
    consumer_secret: "98d79dfe-cd97-41ba-a22b-827e8f67169c-98d79dfe-cd97-41ba-a22b-827e8f67169c",
    token: "b36b2e1f-6031-472c-a1ee-a8e72c956af9",
    token_secret: "e1dfaf78-6f57-4b15-9529-0ace969f511304f012dd-7990-40b4-86ac-b35119e20b51",
    signature_method: 'HMAC-SHA1'
}
const api = (url, method, body) => {
    let options = {}
    options = {
        strictSSL: false,
        method: method,
        url: url,
        body: body,
        // page: page,
        oauth: oauth_prod,
        header: {
            "Content-Type": "application/json"
        },
        json: true
    }
    return rp(options)
}
module.exports = api