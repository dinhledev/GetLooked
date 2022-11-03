const express = require("express");
const db = require("../db");
let router = express.Router();

router.post("/", (req, res) => {
  res.clearCookie("userId");
  req.session.destroy();
  res.redirect("/");
  res.status(302);
});

module.exports = router;
