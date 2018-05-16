const express = require('express');
const personsRouter = express.Router();
const ObjectID = require('mongodb').ObjectID;
const db = require('../db');
const COLLECTION_NAME = 'persons';

personsRouter.get('/:id', async (req, res) => {
  const person = await db.get().collection(COLLECTION_NAME).findOne({_id: ObjectID(req.params.id)});
  try {
    res.send(person);
  } catch(error) {
    console.log(error);
    return error;
  }
});

personsRouter.get('/', async (req, res) => {
  const query = req.query.name;
  //console.log(query);
  let params = {};
  if (query) {
    params.name = {'$regex': '^' + query, '$options': 'i'};
  }
  const persons = await db.get().collection(COLLECTION_NAME)
    .find(params).toArray();
  res.send(persons);
});

personsRouter.post('/', async (req, res) => {
  const person = await db.get().collection(COLLECTION_NAME).save(req.body);
  res.send(person);
});

personsRouter.patch('/:id', async (req, res) => {
  const person = await db.get().collection(COLLECTION_NAME).findOneAndUpdate({_id: ObjectID(req.params.id)}, { $set: req.body}, {returnOriginal: false})
  res.send(person.value)
});

// personsRouter.get("/all_id", async(req,res) => res.send((await db).persons.map(user => user.id)));
//


//delete person
//await db.get().collection(collectionName).deleteOne({id: 43});
module.exports = personsRouter;
