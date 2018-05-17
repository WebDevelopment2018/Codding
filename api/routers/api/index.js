const APIRoute = require("express").Router()

APIRoute.use("/person", require("./person"))

module.exports = APIRoute
