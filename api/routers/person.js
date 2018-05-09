const express = require('express');
const personsRouter = express.Router();
const db = require('../db');
const collectionName = 'persons';

let lastId = null;

personsRouter.get('/:id', async (req, res) => {
  const person = await db.get().collection(collectionName).findOne({id: parseInt( req.params.id)});
  try {
    res.send(person);
  } catch(error) {
    console.log(error);
    return error;
  }
});

personsRouter.get('/name/:query', async (req, res) => {
  const query = req.params.query;
  //console.log(query);
  let params = {};
  if (query) {
    params.name = {'$regex': '^' + query, '$options': 'i'};
  }
  const persons = await db.get().collection(collectionName)
    .find(params).toArray();
  //console.log(persons);
  res.send(persons);
});

personsRouter.post('/', async (req, res) => {
  if(!lastId){lastId = await db.get().collection(collectionName).find().count();}
  let person = req.body;
  lastId++;
  person["id"] = lastId;
  const newPerson = await db.get().collection(collectionName).save(person);
  //console.log(newPerson);
  res.send(person);
});

personsRouter.patch('/:id', async (req, res) => {
  const person = await db.get().collection(collectionName).findOneAndUpdate({ id: parseInt( req.params.id) }, { $set: req.body}, {returnOriginal: false})
  res.send(person.value)
})

// personsRouter.get("/all_id", async(req,res) => res.send((await db).persons.map(user => user.id)));
//


//delete person
//await db.get().collection(collectionName).deleteOne({id: 43});
module.exports = personsRouter;
