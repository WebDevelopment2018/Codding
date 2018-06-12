const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const cors = require("cors")
const db = require("./api/db")

const MONOGO_URL =
  process.env.MONGODB_URI ||
  "mongodb://heroku_6340984l:gdvle8etjvjspvis7e4knu23t0@ds137550.mlab.com:37550/heroku_6340984l" ||
  "mongodb://localhost:27017/family-tree"

const PORT = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/api", require("./api/routers/api"))

app.use(express.static(path.resolve("build")))

app.use("/*", (req, res) => res.sendFile(path.join(__dirname, "build", "index.html")))

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
