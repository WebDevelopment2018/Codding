const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const db = require("./api/db")

const MONOGO_URL = process.env.MONGODB_URI || "mongodb://localhost/family-tree"
const PORT = process.env.PORT || 3000

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/api", require("./api/routers/api"))

app.use(express.static(path.resolve("build")));

app.use("/*",  (req, res) => res.sendFile(path.join(__dirname, "build", "index.html")))

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
