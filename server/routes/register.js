const bcrypt = require("bcrypt");
const express = require("express");
const db = require("../db");
let router = express.Router();
const saltRounds = 10;

router.post("/", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const dob = req.body.dob;
  const facility_name = req.body.facility_name;
  const offense = req.body.offense;
  const sentence_length = req.body.sentence_length;
  const security_question_1 = req.body.security_question_1;
  const security_question_2 = req.body.security_question_2;
  const security_question_3 = req.body.security_question_3;
  const answer_1 = req.body.answer_1;
  const answer_2 = req.body.answer_2;
  const answer_3 = req.body.answer_3;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO users (username, password, dob, facility_name, offense, sentence_length, ssn, photo_id, birth_certificate, gender, dom_violence, has_kids, medical_condition, mental_health, substance_disorder,security_question_1,security_question_2,security_question_3,answer_1,answer_2,answer_3) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        username,
        hash,
        dob,
        facility_name,
        offense,
        sentence_length,
        0,
        0,
        0,
        "",
        0,
        0,
        0,
        0,
        0,
        security_question_1,
        security_question_2,
        security_question_3,
        answer_1,
        answer_2,
        answer_3,
      ],
      (err, result) => {
        console.log(err);
      }
    );
  });
  res.send({ message: true });
});

module.exports = router;
