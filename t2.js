const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const url = process.env.uri;
// Replace the following with your Atlas connection string
// const url = "";
const connectDB = () => {
    return new MongoClient(url);
};

// Reference the database to use
const dbName = "netflixClone";

async function run() {
    const client = connectDB();
    try {
        // Connect to the Atlas cluster
        await client.connect();
        const db = client.db(dbName);

        // Reference the "people" collection in the specified database
        const col = db.collection("userData");

        // Create a new document
        // name: { first: "Alan", last: "Turing" },
        // birth: new Date(1912, 5, 23), // May 23, 1912
        // death: new Date(1954, 5, 7), // May 7, 1954
        // contribs: ["Turing machine", "Turing test", "Turingery"],
        // views: 1250000,
        let personDocument = {
            userName: "d@e.com",
            userPass: "SomeVeryLongPasswordHashValuePartThree",
        };

        // Insert the document into the specified collection
        const p = await col.insertOne(personDocument);

        // Find and return the document
        const filter = { userName: "d@e.com" };
        const document = await col.findOne(filter);
        console.log("Document found:\n" + JSON.stringify(document));
    } catch (err) {
        console.log(err.stack);
    } finally {
        await client.close();
    }
}

async function run2() {
    const client = connectDB();
    try {
        // Connect to the Atlas cluster
        await client.connect();
        const db = client.db(dbName);

        // Reference the "people" collection in the specified database
        const col = db.collection("userData");

        // Create a new document
        // name: { first: "Alan", last: "Turing" },
        // birth: new Date(1912, 5, 23), // May 23, 1912
        // death: new Date(1954, 5, 7), // May 7, 1954
        // contribs: ["Turing machine", "Turing test", "Turingery"],
        // views: 1250000,
        let personDocument = {
            userName: "c@a.com",
            userPass: "SomeVeryLongPasswordHashValuePartTwo",
        };

        // Insert the document into the specified collection
        const p = await col.insertOne(personDocument);

        // Find and return the document
        const filter = { userName: "c@a.com" };
        const document = await col.findOne(filter);
        console.log("Document found:\n" + JSON.stringify(document));
    } catch (err) {
        console.log(err.stack);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
run2().catch(console.dir);
