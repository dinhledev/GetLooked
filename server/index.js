// requiring all required packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const app = express();
app.use(express.json());
const port = 3001

//Initializing middleware
app.use(cors({origin: ["http://localhost:3000"],methods: ["GET", "POST", "DELETE"],credentials: true}));
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
const profile = require("./routes/profile")
const home = require("./routes/home")
const housing = require("./routes/housing")
const employment = require("./routes/employment")
const basicNeeds = require("./routes/basicNeeds")
const forgotPassword = require("./routes/forgotPassword")
const logout = require("./routes/logout")
const login = require("./routes/login")
const register = require("./routes/register")
const favorites = require("./routes/favorites")
const health = require("./routes/health")
const hotline = require("./routes/hotline")
const information = require("./routes/information")
const mentalHealth = require("./routes/mentalHealth")
const substanceUse = require("./routes/substanceUse")
const universal = require("./routes/universal")

// Using routes on api call
app.use("/profile", profile)
app.use("/home", home)
app.use("/housing", housing)
app.use("/employment", employment)
app.use("/basicNeeds", basicNeeds)
app.use("/forgotPassword", forgotPassword)
app.use("/logout", logout)
app.use("/login", login)
app.use("/register", register)
app.use("/favorites", favorites)
app.use("/health", health)
app.use("/hotline", hotline)
app.use("/information", information)
app.use("/mentalHealth", mentalHealth)
app.use("/substanceUse", substanceUse)
app.use("/universal", universal)
app.use("/", home)

// listenting to port
app.listen(port, () => {
    console.log("running server");
 });