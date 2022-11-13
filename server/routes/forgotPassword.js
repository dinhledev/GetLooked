const bcrypt = require("bcrypt");
const express = require("express");
const db = require("../db");
let router = express.Router();
const saltRounds = 10;

//TODO6: Create a function to select all sec questions from a userName
router.post("/getSecQuestionbyUsername", (req, res) => {
  const username = req.body.username;
  db.query(
    "SELECT * FROM users WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

//TODO7: function to update new password
router.post("/updatePassword", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username + " : " + password);
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "  UPDATE users SET password='" +
        hash +
        "' WHERE username='" +
        username +
        "';  ",
      (err, result) => {
        console.log(err);
        if (err) {
        }
      }
    );
  });
  res.send({ message: true });
});

module.exports = router;
