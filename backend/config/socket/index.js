const expres = require("express");
const app = expres();
let {Server: HttpServer} = require("http");
let httpServer = new HttpServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  module.exports = {
    httpServer,
    io
    };