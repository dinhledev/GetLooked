const mysql = require("mysql");

//local
// const db = mysql.createConnection({
//     user: "root", 
//     host: "localhost",
//     password: "12345",
//     database: "getlookeddb",
//  });

// production
 const db = mysql.createConnection({
    user: "b91615ce5e9a5d", 
    host: "us-cdbr-east-06.cleardb.net",
    password: "50ee26f6",
    database: "heroku_33b3d5b42aabf16",
 });
 
 //mysql://b91615ce5e9a5d:50ee26f6@us-cdbr-east-06.cleardb.net/heroku_33b3d5b42aabf16?reconnect=true
 module.exports = db