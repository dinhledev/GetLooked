const mysql = require("mysql2");

const db = mysql.createConnection({
    user: "root", 
    host: "localhost",
    // password: "root_2904",
    password: "12345",
    database: "rac_db",
 });

 module.exports = db