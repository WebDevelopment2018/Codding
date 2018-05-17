const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")
const db = require("./db")

const MONOGO_URL = process.env.MONGODB_URI || "mongodb://localhost/family-tree"
const PORT = process.env.PORT || 3000

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//TODO: create api Router;

app.use("/api", require("./routers/api"))

app.use("/build", express.static(path.resolve("build")))
app.use("/*", (req, res) => res.sendFile(path.resolve("index.html")))



db.connect(MONOGO_URL, err => {
  if (err) return console.log("Unable to connect to Mongo.")
  console.log("Connected to mongo")
  startApp(app)
})

const startApp = app => {
  app.listen(PORT, err => {
    if (err) return console.log("something bad happened", err)
    console.log(`server is listening on ${PORT}`)
  })
}
