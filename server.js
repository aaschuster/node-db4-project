const express = require("express");
const server = express();

server.use(express.json());

//endpoints here

module.exports = server;