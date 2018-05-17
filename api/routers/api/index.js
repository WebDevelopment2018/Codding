const APIRoute = require("express").Router()
APIRoute.use("/persons", require("./person"))

module.exports = APIRoute
