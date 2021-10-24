
var mongoose = require('mongoose');
var express = require('express'); 
var router = express.Router();
var UserModel = require('./userschema');
require('dotenv/config');
  
// Connecting to database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser : true, 
useUnifiedTopology: true }, function(error) {
    if (error) {
        console.log("Error!" + error);
    }
    else{console.log("MongoDB connected Succesfully.");}
});

module.exports = router;