import express from "express";
import db from "/db";

const personsRouter = express.Router();

personsRouter.get("/persons", async(req,res) => res.send((await db).data.map(user => user._id)));

personsRouter.get("/persons/:id", async(req,res) => {
  const data = await db;
  const user = data.find(user => user._id === req.params.id);
  res.send(user);
});

export default personsRouter;
