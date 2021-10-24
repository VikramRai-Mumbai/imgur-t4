var mongoose=require('mongoose');
const moment = require('moment-timezone');
const dateAsia = moment.tz(Date.now(), "Asia/Kolkata");  

var CommentSchema = new mongoose.Schema({
    CommentId:Number,
    Comments:String,
    ImageId:Number,
    Status:String,
    CommentByUserID:Number,
    CommentedOn:{type : Date, default : dateAsia},
    DeletedOn:{type : Date}
});
  
module.exports = mongoose.model(
    'comment', CommentSchema, 'Comments');