const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

const accountRouter = require("../accountRouter");

server.use(express.json());

server.use("/api/accounts", accountRouter);

server.get("/", (req, res) => {
  res.status(200).json({ meesage: "api is running" });
});

module.exports = server;
