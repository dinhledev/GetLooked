const bcrypt = require("bcrypt");
const express = require("express");
const db = require("../db");
let router = express.Router();
const saltRounds = 10;

router.post("/", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.query(
    "SELECT * FROM user_account WHERE email = ?;",
    email,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
          } else {
            res.send({ message: "Wrong username/password comination!" });
          }
        });
      } else {
        res.send({ message: "User Doesn't Exist" });
      }
    }
  );
});

router.get("/", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

module.exports = router;
