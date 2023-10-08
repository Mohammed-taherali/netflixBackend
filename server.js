// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
dotenv.config();
const {
    validEmail,
    validPassword,
    checkUserExists,
    insertUser,
    checkLogin,
} = require("./helpers");
const app = express();
const PORT = process.env.PORT || 5000;
const oneDay = 24 * 60 * 60 * 1000;
var session;

app.use(cors());
app.use(express.json());

async function checkWrapper(user) {
    let isExists = false;
    if (await checkUserExists(user)) {
        isExists = true;
    }
    return isExists;
}

app.use(
    sessions({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: true,
        cookie: { maxAge: oneDay },
        resave: false,
    })
);

app.post("/api/session", (req, res) => {
    const sessionId = req.session.userId || "";
    if (sessionId) {
        res.json({ status: "success" });
        res.end();
    } else {
        res.json({ status: "failure" });
        res.end();
    }
});

app.post("/api/signup", (req, res) => {
    // console.log("req ", req.body);
    const { userName, userPass, confirmPass } = req.body;
    if (!validEmail(userName)) {
        // console.log("valid username");
        res.json({ status: "failure", message: "Invalid Email Id" });
        res.end();
    } else if (userPass !== confirmPass) {
        res.json({ status: "failure", message: "Passwords don't match" });
        res.end();
    } else if (!validPassword(userPass)) {
        res.json({
            status: "failure",
            message:
                "Password must contain atleast 7 characters, a special symbol and a number",
        });
        res.end();
    } else {
        // console.log("valid credentials");
        checkWrapper(userName).then((isExists) => {
            if (isExists) {
                // console.log("Sorry user exists");
                res.json({
                    status: "failure",
                    message: "User with this name already exists",
                });
                res.end();
            } else {
                insertUser(userName, userPass).then((insertStatus) => {
                    if (insertStatus === true) {
                        res.json({
                            status: "success",
                            message: "User Successfully created",
                        });
                        res.end();
                    } else {
                        res.json({
                            status: "failure",
                            message:
                                "Could not create user, please try after some time",
                        });
                        res.end();
                    }
                });
            }
        });
    }
});

app.post("/api/login", (req, res) => {
    const { userEmail, userPass } = req.body;
    checkLogin(userEmail, userPass).then((results) => {
        if (results.status === "success") {
            session = req.session;
            session.userId = userEmail;
            // console.log("ses det: ", session);
            res.json(results);
            res.end();
        } else {
            res.json(results);
            res.end();
        }
    });
});

app.post("/api/logout", (req, res) => {
    req.session.destroy();
    res.json({ status: "success" });
    res.end();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
