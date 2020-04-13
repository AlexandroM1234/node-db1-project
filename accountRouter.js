const express = require("express");

// database access using knex
const db = require("./data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch((err) => {
      console.log("error getting accounts", err);
      res.status(500);
    });
});

module.exports = router;
