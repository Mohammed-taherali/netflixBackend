const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const uri = process.env.uri;
// Connection URI
// const uri = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority';

// Create a new MongoClient
const client = new MongoClient(uri);

// Connect to the MongoDB server
client.connect(async (err) => {
    if (err) {
        console.error("Error occurred while connecting to MongoDB:", err);
        return;
    }

    // Specify the database and collection
    const database = client.db("netflixClone");
    const collection = database.collection("userData");

    // Insert a single document
    const document = {
        userName: "b@g.com",
        userPass: "SomeVeryLongPasswordHashValue",
    };
    const result = await collection.insertOne(document);
    console.log(
        `Inserted ${result.insertedCount} document into the collection.`
    );

    // Close the client
    client.close();
});

// var MongoClient = require("mongodb").MongoClient;
// const dotenv = require("dotenv");
// dotenv.config();
// const uri = process.env.URI;
// // var url = "mongodb://localhost:27017/";

// MongoClient.connect(uri, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("netflixClone");
//     //   var myobj = { name: "Company Inc", address: "Highway 37" };
//     var myobj = {
//         userName: "a@y.com",
//         userPass: "SomeVeryLongPasswordHashValue",
//     };
//     dbo.collection("userData").insertOne(myobj, function (err, res) {
//         if (err) throw err;
//         console.log("1 document inserted");
//         db.close();
//     });
// });

// // const { MongoClient } = require("mongodb");
// // const dotenv = require("dotenv");
// // dotenv.config();
// // const uri = process.env.URI;
// // const client = new MongoClient(uri);
// // const db = client.db("netflixClone");

// // db.collection("userData").insertOne({
// //     userName: "a@y.com",
// //     userPass: "SomeVeryLongPasswordHashValue",
// // });

// // // async function createUniqueIndex() {
// // //     const client = new MongoClient(uri);
// // //     console.log("unique");
// // //     try {
// // //         // await client.connect();
// // //         console.log("connected");
// // //         const db = client.db("netflixClone");
// // //         const userData = db.collection("userData");

// // //         userData.createIndex({ userName: 1 }, { unique: true });
// // //     } catch (err) {
// // //         console.log("Error while creating index: ", err);
// // //     } finally {
// // //         console.log("Successfully created index");
// // //         await client.close();
// // //     }
// // // }

// // // async function TryInserting() {
// // //     const client = new MongoClient(uri);
// // //     try {
// // //         // await client.connect();
// // //         const db = client.db("netflixClone");
// // //         const userData = db.collection("userData");

// // //         userData.insertOne({
// // //             userName: "a@y.com",
// // //             userPass: "SomeVeryLongPasswordHashValue",
// // //         });
// // //     } catch (err) {
// // //         console.log("Error in inserting:", err);
// // //     } finally {
// // //         console.log("Successfully inserted record");
// // //         await client.close();
// // //     }
// // // }

// // // async function run() {
// // //     console.log("entered run function");
// // //     try {
// // //         await createUniqueIndex();
// // //         await TryInserting();
// // //     } catch (err) {
// // //         console.error("Error:", err);
// // //     } finally {
// // //         // Ensure that the program exits gracefully
// // //         process.exit(0);
// // //     }
// // // }

// // // run();

// // // // const { MongoClient } = require("mongodb");
// // // // const dotenv = require("dotenv");
// // // // dotenv.config();
// // // // const uri = process.env.URI;

// // // // async function createUniqueIndex() {
// // // //     const client = new MongoClient(uri);
// // // //     const db = client.db("netflixClone");
// // // //     const userData = db.collection("userData");
// // // //     try {
// // // //         userData.createIndex({ userName: 1 }, { unique: true });
// // // //     } catch (err) {
// // // //         console.log("Error while creating index: ", err);
// // // //     } finally {
// // // //         console.log("Successfully created index");
// // // //         await client.close();
// // // //     }
// // // // }

// // // // createUniqueIndex();

// // // // async function TryInserting() {
// // // //     const client = new MongoClient(uri);
// // // //     const db = client.db("netflixClone");
// // // //     const userData = db.collection("userData");
// // // //     try {
// // // //         // const client = new MongoClient()
// // // //         userData.insertOne({
// // // //             userName: "a@y.com",
// // // //             userPass: "SomeVeryLongPasswordHashValue",
// // // //         });
// // // //     } catch (err) {
// // // //         console.log("Error in inserting:", err);
// // // //     } finally {
// // // //         console.log("Succesfully inserted record");
// // // //         await client.close();
// // // //     }
// // // // }

// // // // TryInserting();

// // // // // Importing the crypto library
// // // // const crypto = require("crypto");

// // // // // Defining the algorithm
// // // // let algorithm = "sha256";

// // // // // Defining the key
// // // // let key = "abcd@123";

// // // // // Creating the digest in hex encoding
// // // // let digest1 = crypto.createHash(algorithm).update(key).digest("hex");

// // // // // Creating the digest in base64 encoding
// // // // // let digest2 = crypto.createHash(algorithm).update(key).digest("base64");

// // // // // Printing the digests
// // // // console.log("In hex Encoding : \n " + digest1 + "\n");
// // // // // console.log("In base64 encoding: \n " + digest2);
