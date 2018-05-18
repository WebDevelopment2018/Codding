const personsRouter = require("express").Router()
const { ObjectID } = require("mongodb")

const db = require("../../db")

const COLLECTION_NAME = "persons"

personsRouter.get("/:id", async (req, res) => {
  try {
    const person = await db
      .get()
      .collection(COLLECTION_NAME)
      .findOne({ _id: ObjectID(req.params.id) })

    res.send(person)
  } catch (error) {
    console.error(error)
    res.error(error)
  }
})

personsRouter.get("/", async (req, res) => {
  try {
    const { query } = req
    let params = {}

    if (query) {
      const { name } = query
      params.name = { $regex: "^" + name, $options: "i" }
    }

    const persons = await db
      .get()
      .collection(COLLECTION_NAME)
      .find(params)
      .toArray()

    res.send(persons)
  } catch (error) {
    console.error(error)
    res.error(error)
  }
})

personsRouter.post("/", async (req, res) => {
  const person = await db
    .get()
    .collection(COLLECTION_NAME)
    .save(req.body)
  res.send(person)
})

personsRouter.patch("/:id", async (req, res) => {
  const person = await db
    .get()
    .collection(COLLECTION_NAME)
    .findOneAndUpdate(
      { _id: ObjectID(req.params.id) },
      { $set: req.body },
      { returnOriginal: false }
    )
  res.send(person.value)
})

// personsRouter.get("/all_id", async(req,res) => res.send((await db).persons.map(user => user.id)));
//

//delete person
//await db.get().collection(collectionName).deleteOne({id: 43});
module.exports = personsRouter
