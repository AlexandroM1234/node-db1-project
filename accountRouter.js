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

router.put("/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  db("accounts")
    .where({ id })
    .update(changes)
    .then((count) => {
      if (count) {
        res.status(200).json(changes);
      } else {
        res
          .status(404)
          .json({ error: `no account with the ID of ${id} could be found` });
      }
    })
    .catch((err) => {
      console.log("error trying to change a account", err);
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("accounts")
    .where({ id })
    .delete({ id })
    .then((post) => {
      if (post) {
        res.status(200).json({ message: "post deleted" });
      } else {
        res
          .status(404)
          .json({ message: "post with that ID could not be found" });
      }
    });
});
module.exports = router;
