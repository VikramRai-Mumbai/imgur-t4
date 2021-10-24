var mongoose=require('mongoose');
const moment = require('moment-timezone');
const dateAsia = moment.tz(Date.now(), "Asia/Kolkata");  

var UserSchema = new mongoose.Schema({
    UserId:Number,
    Name:String,
    Email:String,
    Mobile:Number,
    Password:String,
    Birthday:Date,
    Address:String,
    ProfileImage:String,
    PostCount:Number,
    Status:String,
    CreatedOn:{type : Date, default : dateAsia}
});
  
module.exports = mongoose.model(
    'user', UserSchema, 'Users');