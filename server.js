// backend/server.js
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const { authenticate } = require("./authenticate");
// const mongoose = require("mongoose");
const { validEmail, validPassword, newFunc } = require("./helpers");
const app = express();
const PORT = process.env.PORT || 5000;
// const uri = "mongodb://0.0.0.0:27017/";
// const uri = `mongodb+srv://${process.env.}:KPB9cLCPZrCakomB@netflixclone.oumor9m.mongodb.net/?retryWrites=true&w=majority`;
const uri = process.env.URI;
const client = new MongoClient(uri);
// const uri = "mongodb://0.0.0.0:27017/netflixClone";
// mongoose.connect(uri);

// const UserSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     occupation: String,
// });

// const UserModel = mongoose.model("userData", UserSchema);

app.use(cors());
app.use(express.json());
app.use(authenticate);

async function run(userName, userPass) {
    try {
        const database = client.db("netflixClone");
        const userData = database.collection("userData");
        // Query for a movie that has the title 'Back to the Future'
        const data = { userName: userName, userPass: userPass };

        const res = await userData.insertOne(data);

        console.log(`Doc inserted with id: ${res.insertedId}`);
        // const query = { name: "mohammed" };
        // const user = await userData.findOne(query);
        // console.log(user);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

app.post("/api/signup", (req, res) => {
    console.log("req ", req.body);
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
        console.log("valid credentials");
        // run(userName, userPass).catch((err) => {
        //     console.log(err);
        // });
        res.json({ abcd: "efgh", hijk: "lmnop" });
        res.end();
    }
});

app.post("/api/login", newFunc, (req, res) => {
    const userName = "mohammed";
    const password = "password";
    const { userEmail, userPass } = req.body;
    // console.log("data = ", userEmail, userPass);
    if (userEmail === userName && userPass === password) {
        res.status(200).json({
            status: "success",
            message: "User successfully Authenticated",
        });
        res.end();
    } else {
        res.json({
            status: "failure",
            message: "Incorrect Id or password",
        });
        res.end();
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
