const json = require("../data/db");
const db = require('./db');

const jsonToMongo = () => {
  personsCollection = db.get().collection("persons");
  personsCollection.insert(json.persons, (err, result) => {
    if(err) return console.log(err);
    console.log("persons from json added")
  });
}