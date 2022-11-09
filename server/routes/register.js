const bcrypt = require("bcrypt");
const express = require("express");
const db = require("../db");
let router = express.Router();
const saltRounds = 10;

router.post("/", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const date_of_birth = req.body.date_of_birth;
  const height = req.body.height;
  const weight = req.body.weight;
  const sport = req.body.sport;
  const position = req.body.position;
  const about = req.body.about;
  const org_name = req.body.org_name;
  const street_address = req.body.street_address;
  const city = req.body.city;
  const state = req.body.state;
  const is_org = req.body.is_org;
  const acc_pic = req.body.acc_pic;

  console.log(first_name);

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    let sql = "INSERT INTO user_account ( email, password, first_name, last_name, date_of_birth, height, weight, sport, position, about, org_name, street_address, city, state,is_org, acc_pic) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    db.query(
      sql,
      [
        email,
        hash,
        first_name,
        last_name,
        date_of_birth,
        height, weight,
        sport,
        position,
        about,
        org_name,
        street_address,
        city,
        state,
        is_org,
        acc_pic
      ],
      (err, result) => {
        console.log(err);
      }
    );
  });
  res.send({ message: true });
});

module.exports = router;
