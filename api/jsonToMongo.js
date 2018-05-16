const json = require("../data/db");
const db = require("./db");

const jsonToMongo = () => {
  let personsCollection = db.get().collection("persons");

  personsCollection.insert(json.persons, (err, result) => {
    if (err) return console.log(err);
    console.log("persons from json added");
  });
};

const badToNormalId = async () => {
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
};

module.exports = jsonToMongo;