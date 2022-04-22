require("dotenv").config();

let backend = {
    backend_url: process.env.BACKEND_URL,
}
console.log(backend.backend_url);
module.exports = { backend };