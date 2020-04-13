const express = require("express");

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

router.get("/:id", (req, res) => {
  db("accounts")
    .where("id", req.params.id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      console.log("error getting via ID", err);
    });
});

router.post("/", (req, res) => {
  db("accounts")
    .insert(req.body)
    .then((newPost) => {
      res.status(201).json(newPost);
    })
    .catch((err) => {
      console.log("error adding a new account", err);
    });
});
module.exports = router;
