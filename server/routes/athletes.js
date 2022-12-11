const express = require("express");
const db = require("../db");
let router = express.Router();

router.post("/", (req, res) => {
  const offset = req.body.offset;
  const perPage = req.body.perPage;
  db.query(
    "SELECT * FROM user_account WHERE is_org='0' ORDER BY account_id ASC LIMIT " + offset + "," + perPage + ";",
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
    "SELECT * FROM user_account WHERE is_org='0';",
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
  let keyWordsSQL = req.body.keyWords;
  const sql = "SELECT * FROM user_account WHERE is_org='0'" + keyWordsSQL +";";
  console.log(sql)
  db.query(
    sql,
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
  let keyWordsSQL = req.body.keyWords;
  const offset = req.body.offset;
  const perPage = req.body.perPage;

  const sql = "SELECT * FROM user_account WHERE is_org='0'" + keyWordsSQL+ " ORDER BY account_id ASC LIMIT " + offset + "," + perPage + ";"
  db.query(
    sql,
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
    "SELECT * FROM user_account WHERE account_id=(?) AND is_org='0';",
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

router.get("/getVideoByAccountId/:account_id", (req, res) => {
  const accountId = req.params.account_id;
  db.query(
    "SELECT * FROM user_post WHERE account_id = (?)",
    accountId,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        console.log(result)
        res.send(result);
      }
    }
  );
});

module.exports = router;
