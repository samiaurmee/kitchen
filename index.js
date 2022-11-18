const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

app.use(cors());
app.use(express.json());

console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2a6n0n7.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const menuCollection = client.db("cloudKitchenFood").collection("menus");

        const reviewCollection = client.db("cloudKitchenFood").collection("reviews");

        app.get("/menus", async (req, res) => {
            const query = {};
            const cursor = menuCollection.find(query);
            const menus = await cursor.toArray();
            res.send(menus);
        });

        // app.get("/menus/:id", async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const menu = await menuCollection.findOne(query);
        //     res.send(menu);
        //   });

        // app.get("/reviews", async (req, res) => {
        //     let query = {};
        //     if (req.query.email) {
        //       query = { email: req.query.email };
        //     }
        //     const cursor = reviewCollection.find(query);
        //     const reviews = await cursor.toArray();
        //     res.send(reviews);
        //   });

        //     app.post("/reviews", async (req, res) => {
        //         const review = req.body;
        //         const result = await reviewCollection.insertOne(review);
        //         res.send(result);
        //       });
    }

    finally {
    }
}

run().catch((error) => console.error(error));
app.get("/", (req, res) => {
    res.send("cloud kitchen server is running");
});

app.get('/', (req, res) => {
    res.send('cloud kitchen server is running')
})

app.listen(port, () => {
    console.log(`cloud kitchen server is running on ${port}`);
});
