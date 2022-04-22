require("dotenv").config();

let client = {
    client_url: process.env.CLIENT_URL,
}

module.exports = { client };