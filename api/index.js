const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = require('./db');
const url = "mongodb://localhost/family-tree";
const personRouter = require("./routers/person");
const PORT = 3000;
const app = express();
//app.use(express.static(path.resolve('build')));
app.use(cors({origin: 'http://localhost:5000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/persons", personRouter);

db.connect(url, (err) => {
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
