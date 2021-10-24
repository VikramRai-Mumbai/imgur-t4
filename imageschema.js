var mongoose=require('mongoose');
const moment = require('moment-timezone');
const dateAsia = moment.tz(Date.now(), "Asia/Kolkata");  

var ImageSchema = new mongoose.Schema({
    ImageId:Number,
    ImageData:{
        data: Buffer,
        contentType: String
    },
    ImageDesc:String,
    LikedCount:Number,
    CommentCount:Number,
    PostCount:Number,
    isDeleted:String,
    PostedByUserID:Number,
    PostedOn:{type : Date, default : dateAsia},
    DeletedOn:{type : Date}
});
  
module.exports = mongoose.model(
    'image', ImageSchema, 'Images');