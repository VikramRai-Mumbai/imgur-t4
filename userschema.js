var mongoose=require('mongoose');
const validator=require('validator');
const moment = require('moment-timezone');
const dateAsia = moment.tz(Date.now(), "Asia/Kolkata");  

var UserSchema = new mongoose.Schema({
    UserId:Number,
    Name:String,
    Email:{
        type:String,
        required:true,
        unique:true,
        validate(value){ 
            if(!validator.isEmail(value)){
                 throw new Error("Email is invalid"); 
            }
        }
          },
    Mobile:{
        type:Number,
        required:true,
        unique:true
        },
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