var mongoose=require('mongoose');
const moment = require('moment-timezone');
const dateAsia = moment.tz(Date.now(), "Asia/Kolkata");  

var LikeSchema = new mongoose.Schema({
    LikeId:Number,
    ImageId:Number,
    LikeByUserID:Number,
    LikedOn:{type : Date, default : dateAsia}
});
  
module.exports = mongoose.model(
    'like', LikeSchema, 'Likes');