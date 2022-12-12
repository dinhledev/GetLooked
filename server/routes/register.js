const bcrypt = require("bcrypt");
const express = require("express");
const db = require("../db");
let router = express.Router();
const saltRounds = 10;
const AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: "AKIAZSW2QC2UCMCL3CFR",
  secretAccessKey: "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",
})
const S3_BUCKET ="getlooked.com.images";
const REGION ="us-east-1";
const URL_EXPIRATION_TIME = 60; // in seconds

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION
})

router.post("/generatePreSignedPutUrl", (req, res) => {
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;
  console.log(fileName + " "  + fileType);
  myBucket.getSignedUrl('putObject', {
      Key: fileName,
      ContentType: fileType,
      Expires: URL_EXPIRATION_TIME
  } , (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      console.log(result);
      res.send(result);
    }
  });

});

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


router.post("/uploadVideo", (req, res) => {
  const accountId = req.session.user[0].account_id;
  const videoLink = req.body.videoLink;
    let sql = "INSERT INTO user_post ( account_id, post_text) VALUES (?,?)"
    db.query(
      sql,
      [
        accountId,
        videoLink,
      ],
      (err, result) => {
        console.log(err);
      }
    );
  res.send({ message: true });
});

module.exports = router;
