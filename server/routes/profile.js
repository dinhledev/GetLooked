const express = require("express");
const db = require("../db");
let router = express.Router();

router.post("/editProfile", (req, res) => {
  const dob = req.body.dob;
  const facility_name = req.body.facility_name;
  const offense = req.body.offense;
  const sentence_length = req.body.sentence_length;
  const ssn = req.body.ssn;
  const photo_id = req.body.photo_id;
  const birth_certificate = req.body.birth_certificate;
  const gender = req.body.gender;
  const dom_violence = req.body.dom_violence;
  const has_kids = req.body.has_kids;
  const medical_condition = req.body.medical_condition;
  const mental_health = req.body.mental_health;
  const substance_disorder = req.body.substance_disorder;

  db.query(
    "UPDATE users SET dob='" +
      dob +
      "', facility_name='" +
      facility_name +
      "', offense='" +
      offense +
      "', sentence_length='" +
      sentence_length +
      "', ssn=" +
      ssn +
      ", photo_id=" +
      photo_id +
      ", birth_certificate=" +
      birth_certificate +
      ", gender='" +
      gender +
      "', dom_violence=" +
      dom_violence +
      ", has_kids=" +
      has_kids +
      ", medical_condition=" +
      medical_condition +
      ", mental_health=" +
      mental_health +
      ", substance_disorder=" +
      substance_disorder +
      " WHERE username='" +
      req.session.user[0].username +
      "';",
    (err, result) => {
      console.log(err);
      if (err) {
      }
    }
  );
  res.send({ message: true });
});

router.get("/", (req, res) => {
  console.log("test username" + req.session.user[0].username),
    db.query(
      "SELECT * FROM users WHERE username = ?;",
      req.session.user[0].username,
      (err, result) => {
        if (err) {
          res.send({ err: err, user: req.session.user });
        } else {
          res.send(result);
        }
      }
    );
});

module.exports = router;
