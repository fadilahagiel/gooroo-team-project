"use strict";

const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);
let db = null;

async function mongoConnect() {
  try {
    db = client.db(process.env.MONGO_DB);
    console.log(`Connected to database`);
  } catch (error) {
    console.log(error);
  }
}

function getDB() {
  return db;
}

module.exports = { mongoConnect, getDB };
