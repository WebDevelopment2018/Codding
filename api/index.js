const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = require('./db');
const personRouter = require("./routers/person");

console.log(env.process.MONGODB_URI);

// const url = "mongodb://localhost/family-tree";
const URL = "mongodb://mohylevska:647098@ds119150.mlab.com:19150/familytreecs";

const PORT = 3000;
const app = express();
//app.use(express.static(path.resolve('build')));
app.use(cors({origin: 'http://localhost:5000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/persons", personRouter);

db.connect(URL, (err) => {
  if (err) return console.log('Unable to connect to Mongo.');
  console.log("Connected to mongo");
  startApp(app);
});

const startApp = (app) => {
  app.listen(PORT, (err) => {
    if (err) {
      return console.log("something bad happened", err);
    }
    console.log(`server is listening on ${PORT}`);
  });
};
