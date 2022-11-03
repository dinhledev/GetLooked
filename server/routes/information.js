const express = require("express");
const db = require("../db");
let router = express.Router();

router.post("/", (req, res) => {
  const offset = req.body.offset;
  const perPage = req.body.perPage;
  db.query(
    "SELECT * FROM reentry_organizations WHERE type='Information' ORDER BY org_id ASC LIMIT " + offset + "," + perPage + ";",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

router.get("/getAll", (req, res) => {
  db.query(
    "SELECT * FROM reentry_organizations WHERE type='Information';",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

router.post("/getAllHasID", (req, res) => {
  db.query(
    "SELECT * FROM reentry_organizations WHERE type='Information' AND criteria Like '%Photo ID%';",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

router.post("/hasID", (req, res) => {
  const offset = req.body.offset;
  const perPage = req.body.perPage;
  db.query(
    "SELECT * FROM reentry_organizations WHERE type='Information' AND criteria Like '%Photo ID%' ORDER BY org_id ASC LIMIT " + offset + "," + perPage + ";",
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
  db.query(
    "SELECT COUNT(*) FROM reentry_organizations WHERE type='Information';",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

router.get("/:org_id", (req, res) => {
  const id = req.params.org_id;
  db.query(
    "SELECT * FROM reentry_organizations WHERE org_id=(?) AND type='Information';",
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
