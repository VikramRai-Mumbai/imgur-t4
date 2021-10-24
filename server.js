var express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');
//var fs = require('fs');
var path = require('path');
require('dotenv/config');
var UserModel = require('./userschema');
var ImageModel = require('./imageschema');
var LikeModel = require('./likeschema');
var CommentModel = require('./commentschema');
const moment = require('moment-timezone');
const dateAsia = moment.tz(Date.now(), "Asia/Kolkata");  

const app = express();
const port = process.env.PORT || '3000';
app.listen(port, function(){
  console.log("Server is listening at port " + port);
});

app.use('/api', api);  



// set the view engine to ejs
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {

  ImageModel.find({}, (err, items) => {
    if (err) {
        console.log(err);
        res.status(500).send('An error occurred', err);
    }
    else {
        res.render('pages/index', { items: items });
    }
});
  

});
// image upload page
app.get('/upload', function(req, res) {
  res.render('pages/upload');
});

// login route page
app.get('/login', function(req, res) {
  res.render('pages/login');
});
// register route page
app.get('/register', function(req, res) {
  res.render('pages/register');
});
// about route page
app.get('/about', function(req, res) {
  res.render('pages/about');
});
// contact route page
app.get('/contact', function(req, res) {
  res.render('pages/contact');
});


app.post('/register/new', function(req, res) {

  var newUser = new UserModel({
      UserId:101, 
      Name:req.body.name,
      Email:req.body.email,
      Mobile:req.body.mobile,
      Password:req.body.password,
      ProfileImage: "./views/images/ProfileImage/101.jpg",
      PostCount:0,
      Status:"Active"
    });
  newUser.save(function(err, data) {
      if(err) {
          console.log(error);
      }
      else {
          res.send("Registered Successfully.");
          setTimeout(res.redirect('/login'), 3000); 
      }
  });
});

// retrive all users
app.get('/userlist', function(req, res) {
  UserModel.find(function(err, data) {
      if(err){
          console.log(err);
      }
      else{
          res.send(data);
      }
  });  
});

// list all image
app.get('/imagelist', function(req, res) {
  ImageModel.find(function(err, data) {
      if(err){
          console.log(err);
      }
      else{
          res.send(data);
      }
  });  
});

// image Like route page
app.get('/like', function(req, res) {
  var newLike = new LikeModel({LikeId:601, 
    ImageId:501,
    LikeByUserID:101,
    LikedOn:dateAsia
    });
    newLike.save(function(err, data) {
      if(err) {
          console.log(error);
      }
      else {
          res.send("Liked successfully");
      }
  });
});
// list all liked 
app.get('/listlike', function(req, res) {
  LikeModel.find(function(err, data) {
      if(err){
          console.log(err);
      }
      else{
          res.send(data);
      }
  });  
});

// comment route page
app.get('/comment', function(req, res) {
  var newComment = new CommentModel({CommentId:701, 
    Comments:"Very nice",
    ImageId:501,
    Status:"Active",
    CommentByUserID:101,
    CommentedOn:dateAsia
    });
    newComment.save(function(err, data) {
      if(err) {
          console.log(error);
      }
      else {
          res.send("Commented successfully");
      }
  });
});
// list all comment
app.get('/listcomment', function(req, res) {
  CommentModel.find(function(err, data) {
      if(err){
          console.log(err);
      }
      else{
          res.send(data);
      }
  });  
});

app.get('/Hello',function(req,res){
    res.send('Hello World');
});

var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/views/images/UploadedImages/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
let fs = require('fs-extra');

let upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      let type = req.params.type;
      let path = `./views/images/UploadedImages/`;
      fs.mkdirsSync(path);
      callback(null, path);
    },
    filename: (req, file, callback) => {
      //originalname is the uploaded file's name with extn
      callback(null, file.originalname);
    }
  })
});

app.post('/uploadNew', upload.single('image'), (req, res) => {

  var obj = {
    ImageID:501,
    LikedCount:0,
    CommentCount:0,
    PostedByUserID:101,
    PostedOn:dateAsia,
    ImageDesc: req.body.desc,
    ImageData: {
        data: fs.readFileSync(path.join(__dirname + '/views/images/UploadedImages/' + req.file.filename)),
        contentType: 'image/png'
    }
}
ImageModel.create(obj, (err, item) => {
    if (err) {
        console.log(err);
    }
    else {
        // item.save();
        console.log("Image uploaded successfully");
        res.redirect('/');
    }
});
});