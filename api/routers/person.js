const express = require('express');
const db = require("../../data/db");

const personsRouter = express.Router();

//personsRouter.get("/persons", async(req,res) => res.send((await db).data.map(user => user._id)));

personsRouter.get("/:id", async(req,res) => {
  const data = await db.persons;
  const user = data.find(user => (user.id === parseInt(req.params.id)));
  res.send(user);
});

module.exports = personsRouter;
