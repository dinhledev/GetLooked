const express = require("express");
const db = require("../db");
let router = express.Router();

router.get("/", (req, res) => {
  db.query(
    "SELECT  reentry_organizations.name, reentry_organizations.type, reentry_organizations.address, reentry_organizations.zip_code, reentry_organizations.description, reentry_organizations.services, reentry_organizations.criteria, reentry_organizations.org_id   FROM rac_db.reentry_organizations JOIN rac_db.favorites ON organization_id=org_id WHERE username = ?;",
    req.session.user[0].username,
    (err, result) => {
      if (err) {
        console.log("Favorites get error: " + err);
        res.send({ err: err });
      } else {
        console.log("Favorites Get: " + result);
        res.send(result);
      }
    }
  );
});
router.post("/paging", (req, res) => {
  const offset = req.body.offset;
  const perPage = req.body.perPage;
  db.query(
    "SELECT reentry_organizations.name, reentry_organizations.type, reentry_organizations.address, reentry_organizations.zip_code, reentry_organizations.description, reentry_organizations.services, reentry_organizations.criteria, reentry_organizations.org_id  FROM rac_db.reentry_organizations JOIN rac_db.favorites ON organization_id=org_id WHERE username = ? ORDER BY organization_id ASC LIMIT " + offset + "," + perPage + ";",
    req.session.user[0].username,
    (err, result) => {
      if (err) {
        console.log("Favorites get error: " + err);
        res.send({ err: err });
      } else {
        console.log("Favorites Get: " + result);
        res.send(result);
      }
    }
  );
});

router.get("/hasID", (req, res) => {
  db.query(
    "SELECT reentry_organizations.name, reentry_organizations.type, reentry_organizations.address, reentry_organizations.zip_code, reentry_organizations.description, reentry_organizations.services, reentry_organizations.criteria, reentry_organizations.org_id  FROM rac_db.reentry_organizations JOIN rac_db.favorites ON organization_id=org_id WHERE username = ? AND criteria Like '%Photo ID%';",
    req.session.user[0].username,
    (err, result) => {
      if (err) {
        console.log("Favorites get error: " + err);
        res.send({ err: err });
      } else {
        console.log("Favorites Get: " + result);
        res.send(result);
      }
    }
  );
});

router.post("/hasIDPaging", (req, res) => {
  const offset = req.body.offset;
  const perPage = req.body.perPage;
  db.query(
    "SELECT reentry_organizations.name, reentry_organizations.type, reentry_organizations.address, reentry_organizations.zip_code, reentry_organizations.description, reentry_organizations.services, reentry_organizations.criteria, reentry_organizations.org_id  FROM rac_db.reentry_organizations JOIN rac_db.favorites ON organization_id=org_id WHERE username = ? AND criteria Like '%Photo ID%'ORDER BY organization_id ASC LIMIT " + offset + "," + perPage + ";",
    req.session.user[0].username,
    (err, result) => {
      if (err) {
        console.log("Favorites get error: " + err);
        res.send({ err: err });
      } else {
        console.log("Favorites Get: " + result);
        res.send(result);
      }
    }
  );
});

router.get("/housingPlanAll", (req, res) => {
  db.query(
    "SELECT reentry_organizations.name, reentry_organizations.type, reentry_organizations.address, reentry_organizations.zip_code, reentry_organizations.description, reentry_organizations.services, reentry_organizations.criteria, reentry_organizations.org_id  FROM rac_db.reentry_organizations JOIN rac_db.favorites ON organization_id=org_id WHERE username = ? AND rac_db.reentry_organizations.type ='Housing';",
    req.session.user[0].username,
    (err, result) => {
      if (err) {
        console.log("Favorites get error: " + err);
        res.send({ err: err });
      } else {
        console.log("Favorites Get: " + result);
        res.send(result);
      }
    }
  );
});

router.post("/housingPlanPaging", (req, res) => {
  const offset = req.body.offset;
  const perPage = req.body.perPage;
  db.query(
    "SELECT reentry_organizations.name, reentry_organizations.type, reentry_organizations.address, reentry_organizations.zip_code, reentry_organizations.description, reentry_organizations.services, reentry_organizations.criteria, reentry_organizations.org_id  FROM rac_db.reentry_organizations JOIN rac_db.favorites ON organization_id=org_id WHERE username = ? AND rac_db.reentry_organizations.type ='Housing' ORDER BY organization_id ASC LIMIT " + offset + "," + perPage + ";",
     req.session.user[0].username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});
router.get("/employmentPlanAll", (req, res) => {
  db.query(
    "SELECT reentry_organizations.name, reentry_organizations.type, reentry_organizations.address, reentry_organizations.zip_code, reentry_organizations.description, reentry_organizations.services, reentry_organizations.criteria, reentry_organizations.org_id  FROM rac_db.reentry_organizations JOIN rac_db.favorites ON organization_id=org_id WHERE username = ? AND rac_db.reentry_organizations.type ='Employment';",
    req.session.user[0].username,
    (err, result) => {
      if (err) {
        console.log("Favorites get error: " + err);
        res.send({ err: err });
      } else {
        console.log("Favorites Get: " + result);
        res.send(result);
      }
    }
  );
});

router.post("/employmentPlanPaging", (req, res) => {
  const offset = req.body.offset;
  const perPage = req.body.perPage;
  db.query(
    "SELECT reentry_organizations.name, reentry_organizations.type, reentry_organizations.address, reentry_organizations.zip_code, reentry_organizations.description, reentry_organizations.services, reentry_organizations.criteria, reentry_organizations.org_id  FROM rac_db.reentry_organizations JOIN rac_db.favorites ON organization_id=org_id WHERE username = ? AND rac_db.reentry_organizations.type ='Employment' ORDER BY organization_id ASC LIMIT " + offset + "," + perPage + ";",
     req.session.user[0].username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

router.get("/mentalHealthPlanAll", (req, res) => {
  db.query(
    "SELECT reentry_organizations.name, reentry_organizations.type, reentry_organizations.address, reentry_organizations.zip_code, reentry_organizations.description, reentry_organizations.services, reentry_organizations.criteria, reentry_organizations.org_id  FROM rac_db.reentry_organizations JOIN rac_db.favorites ON organization_id=org_id WHERE username = ? AND rac_db.reentry_organizations.type ='MentalHealth';",
    req.session.user[0].username,
    (err, result) => {
      if (err) {
        console.log("Favorites get error: " + err);
        res.send({ err: err });
      } else {
        console.log("Favorites Get: " + result);
        res.send(result);
      }
    }
  );
});

router.post("/mentalHealthPlanPaging", (req, res) => {
  const offset = req.body.offset;
  const perPage = req.body.perPage;
  db.query(
    "SELECT reentry_organizations.name, reentry_organizations.type, reentry_organizations.address, reentry_organizations.zip_code, reentry_organizations.description, reentry_organizations.services, reentry_organizations.criteria, reentry_organizations.org_id  FROM rac_db.reentry_organizations JOIN rac_db.favorites ON organization_id=org_id WHERE username = ? AND rac_db.reentry_organizations.type ='MentalHealth' ORDER BY organization_id ASC LIMIT " + offset + "," + perPage + ";",
     req.session.user[0].username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

router.get("/substanceUsePlanAll", (req, res) => {
  db.query(
    "SELECT reentry_organizations.name, reentry_organizations.type, reentry_organizations.address, reentry_organizations.zip_code, reentry_organizations.description, reentry_organizations.services, reentry_organizations.criteria, reentry_organizations.org_id  FROM rac_db.reentry_organizations JOIN rac_db.favorites ON organization_id=org_id WHERE username = ? AND rac_db.reentry_organizations.type ='SubstanceUse';",
    req.session.user[0].username,
    (err, result) => {
      if (err) {
        console.log("Favorites get error: " + err);
        res.send({ err: err });
      } else {
        console.log("Favorites Get: " + result);
        res.send(result);
      }
    }
  );
});

router.post("/substanceUsePlanPaging", (req, res) => {
  const offset = req.body.offset;
  const perPage = req.body.perPage;
  db.query(
    "SELECT reentry_organizations.name, reentry_organizations.type, reentry_organizations.address, reentry_organizations.zip_code, reentry_organizations.description, reentry_organizations.services, reentry_organizations.criteria, reentry_organizations.org_id  FROM rac_db.reentry_organizations JOIN rac_db.favorites ON organization_id=org_id WHERE username = ? AND rac_db.reentry_organizations.type ='SubstanceUse' ORDER BY organization_id ASC LIMIT " + offset + "," + perPage + ";",
     req.session.user[0].username,
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

router.post("/", (req, res) => {
  const username = req.session.user[0].username;
  const organization_id = req.body.organization_id;
  db.query(
    "INSERT INTO favorites (username, organization_id) VALUES (?,?);",
    [username, organization_id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
        console.log("Favorites post error: " + err);
      } else {
        res.send({
          data: {
            status: "Success",
            statusCode: 200,
          },
        });
        console.log("Favorites Post: " + result);
      }
    }
  );
});

router.delete("/", (req, res) => {
  const username = req.session.user[0].username;
  const organization_id = req.body.organization_id;
  console.log("organization_id is:" + req.body.organization_id);
  db.query(
    "DELETE FROM favorites WHERE username=(?) AND organization_id=(?);",
    [username, organization_id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
        console.log("Favorites post error: " + err);
      } else {
        res.send({
          data: {
            status: "Success",
            statusCode: 200,
          },
        });
        console.log("Favorites Delete: " + result);
      }
    }
  );
});

module.exports = router;
