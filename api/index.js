const express = require('express');
const path = require('path');
//const morgan  = require("morgan");
const cors  = require("cors");
const bodyParser = require('body-parser');

const personRouter = require('./routers/person');
const port = 3000;
const app = express();

app.use(express.static(path.resolve('build')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(morgan(':method :url'));
app.use("/persons", personRouter);

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});