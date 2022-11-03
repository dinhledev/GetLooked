const express = require("express");
const db = require("../db");
let router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM reentry_organizations;", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

router.get("/hasID", (req, res) => {
  db.query(
    "SELECT * FROM reentry_organizations WHERE criteria Like '%Photo ID%';",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

router.get("/count", (req, res) => {
  db.query("SELECT COUNT(*) FROM reentry_organizations;", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

router.get("/:org_id", (req, res) => {
  const id = req.params.org_id;
  db.query(
    "SELECT * FROM reentry_organizations WHERE org_id=(?);",
    id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

module.exports = router;
