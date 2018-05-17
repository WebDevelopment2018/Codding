const MongoClient = require("mongodb").MongoClient;
const DB_NAME = "family-tree";

let db = null;
exports.connect = function(url, done) {
  if (db) return done();
  MongoClient.connect(url, (err, client) => {
    if (err) return console.log(err);
    db = client.db(DB_NAME);
    done();

  })
};

exports.get = function() {
  return db;
};