const crypto = require("crypto");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const uri = process.env.URI;
const connectDB = () => {
    return new MongoClient(uri);
};
const dbName = "netflixClone";
const algorithm = "sha256";

var executeOnlyOnce = (function () {
    var executed = false;
    return function () {
        if (!executed) {
            executed = true;
            // do something
        }
    };
})();

const validEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validPassword = (pass) => {
    var passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,16}$/;
    return pass.match(passRegex);
};

const hashData = (data) => {
    return crypto.createHash(algorithm).update(data).digest("hex");
};

async function insertUser(user, pass) {
    const client = connectDB();
    try {
        await client.connect();
        const db = client.db(dbName);
        const userData = db.collection("userData");
        const hashedPass = hashData(pass);
        let userDoc = {
            userName: user,
            userPass: hashedPass,
        };
        const rec = await userData.insertOne(userDoc);
        if (rec.acknowledged == true) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Error while inserting: ", error);
    }
}

async function checkUserExists(user) {
    const client = connectDB();
    try {
        await client.connect();
        const db = client.db(dbName);
        const userData = db.collection("userData");

        const userExists = await userData.findOne({
            userName: user,
        });

        return userExists ? true : false;
    } catch (error) {
        console.log("Error in checkUserExists: ", error);
    }
}

async function checkLogin(user, pass) {
    const client = connectDB();
    try {
        await client.connect();
        const db = client.db(dbName);
        const userData = db.collection("userData");
        const hashedPass = hashData(pass);

        const userExists = await userData.findOne({
            userName: user,
            // userPass: hashedPass,
        });

        if (userExists) {
            // console.log("user pass ", userExists.userPass);
            if (hashedPass === userExists.userPass) {
                return {
                    status: "success",
                    message: "User logged in successfully",
                };
            } else {
                return {
                    status: "failure",
                    message: "Incorrect Id or password",
                };
            }
        } else {
            return {
                status: "failure",
                message: "No user found, please sign up first",
            };
        }

        // console.log("user exists: ", userExists);

        // return userExists ? true : false;
    } catch (error) {
        console.log("Error in checkUserExists: ", error);
    }
}

module.exports = {
    validEmail,
    validPassword,
    checkUserExists,
    insertUser,
    checkLogin,
};
