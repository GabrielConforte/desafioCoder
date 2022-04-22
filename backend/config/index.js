
require("dotenv").config();

let config = {
    port: process.env.PORT,
    cors: process.env.CORS,
}

let mongo_db = {
    mongo_uri: process.env.MONGO_URI || "localhost",
    mongo_name: process.env.DB_NAME|| "sistema"
}

let cors = {
    cors: process.env.CLIENT_URL,
}

let client = {
    client_url: process.env.CLIENT_URL,
    client_id_fb: process.env.CLIENT_ID_FB,
    client_secret_fb: process.env.CLIENT_SECRET_FB
}



module.exports = { config, mongo_db, cors, client };

console.log(client)