const mongoose = require('mongoose');


let mongoDB = ("mongodb+srv://<roksoliana>:<canon3540>@ucu-cs-0pfih.mongodb.net/test");
mongoose.connect(mongoDB);

mongoose.Promise = global.Promise;

//Get the default connection
let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));