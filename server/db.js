const mysql = require("mysql2");

const db = mysql.createConnection({
    user: "root", 
    host: "localhost",
    password: "12345",
    database: "getlookeddb",
 });

 module.exports = db