const express = require('express');
const personsRouter = express.Router();
const ObjectID = require('mongodb').ObjectID;
const db = require('../db');
const collectionName = 'persons';

let lastId = null;

personsRouter.get('/:id', async (req, res) => {
  const person = await db.get().collection(collectionName).findOne({_id: ObjectID(req.params.id)});
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
  const person = await db.get().collection(collectionName).findOneAndUpdate({_id: ObjectID(req.params.id)}, { $set: req.body}, {returnOriginal: false})
  res.send(person.value)
})

// personsRouter.get("/all_id", async(req,res) => res.send((await db).persons.map(user => user.id)));
//


//delete person
//await db.get().collection(collectionName).deleteOne({id: 43});
module.exports = personsRouter;

const badToNormalId = async ()=>{
  for(let i = 1; i <=42; i++){
    let person = await db.get().collection(collectionName).findOne({id: i});
    if(person.father){
      const father = await db.get().collection(collectionName).findOne({id: parseInt( person.father)});
      person.father = father._id;
      }
    if(person.mother){
      const mother = await db.get().collection(collectionName).findOne({id: parseInt( person.mother)});
      person.mother = mother._id;
    }
    if(person.relationship){
      const newRel = await Promise.all(person.relationship.map(id => db.get().collection(collectionName).findOne({id: id})));
      person.relationship = newRel.map(p => p._id);
    }
    if(person.children){
      const newC = await Promise.all(person.children.map(id => db.get().collection(collectionName).findOne({id: id})));
      person.children = newC.map(p => p._id);
    }
    await db.get().collection(collectionName).findOneAndUpdate({ id: i }, { $set: person}, {returnOriginal: false});
    console.log("person: ",person);
  }
}