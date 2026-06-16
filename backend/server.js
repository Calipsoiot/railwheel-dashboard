require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());

const client = new MongoClient(process.env.MONGO_URI);

app.get("/production", async (req, res) => {
  try {
    await client.connect();

    const data = await client
      .db("RWF")
      .collection("production")
      .find()
      .toArray();

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error reading MongoDB");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});