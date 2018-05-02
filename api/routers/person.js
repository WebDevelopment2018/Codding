const express = require('express');
const db = require("../../data/db");

const personsRouter = express.Router();

personsRouter.get("/", async(req,res) => res.send((await db).persons));
personsRouter.get("/all_id", async(req,res) => res.send((await db).persons.map(user => user.id)));

personsRouter.get("/:id", async(req,res) => res.send((await db).persons.find(user => (user.id === parseInt(req.params.id)))));

personsRouter.get("/name/:name", async(req,res) => {
  const data = await db.persons;
  console.log(req.params.name);
  const user = data.filter(user => (user.name.toLowerCase().includes(req.params.name.toLowerCase())));
  res.send(user);
});


module.exports = personsRouter;
