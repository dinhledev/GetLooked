// requiring all required packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const app = express();
app.use(express.json());
const port = process.env.PORT || 3001;

//Initializing middleware
app.use(cors({origin: ["http://getlooked.com","https://getlooked.com"],methods: ["GET", "POST", "DELETE"],credentials: true}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

// Setting session cookie for the user
app.use(session({
    name: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized:false,
    cookie: {
        expires: 14 * 24 * 3600 * 1000 //60 * 60 * 24
    }
}));

// Importing all backend routes
const home = require("./routes/home")
const athletes = require("./routes/athletes")
const logout = require("./routes/logout")
const login = require("./routes/login")
const register = require("./routes/register")

// Using routes on api call
app.use("/home", home)
app.use("/athletes", athletes)
app.use("/logout", logout)
app.use("/login", login)
app.use("/register", register)
app.use("/", home)

// listenting to port
app.listen(port, () => {
    console.log("running server");
 });