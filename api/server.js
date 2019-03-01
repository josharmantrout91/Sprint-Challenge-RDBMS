const express = require("express");
const helmet = require("helmet");

const projectRouter = require("../projects/projects-router.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api", projectRouter);

module.exports = server;
