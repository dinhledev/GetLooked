const mysql = require("mysql");

// const db = mysql.createConnection({
//     user: "admin", 
//     host: "awseb-e-kdzrcpfnxm-stack-awsebrdsdatabase-1eseaby5hc9u.cor0kbnpjcax.us-east-1.rds.amazonaws.com",
//     password: "Mapiumap1%",
//     database: "getlookedDB",
//  });

 const db = mysql.createConnection({
    user: "root", 
    host: "localhost",
    password: "12345",
    database: "getlookeddb",
 });

 module.exports = db