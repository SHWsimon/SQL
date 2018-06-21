var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

//DB address
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'simonwang210',  //your username
  database : 'join_us'         //the name of your db
});

//connect to DB
app.get("/", function(req, res){
     var q = 'SELECT COUNT(*) as count FROM users';
     connection.query(q, function (error, results) {
         if (error) throw error;
         var count=results[0].count;
         console.log(count); //for terminal nodejs
         var msg = "We have " + results[0].count + " users";
         // res.send(msg); //for web page
         res.render("home", {data: count, name: 'simon'});
     });
});

//Add a /joke route:
app.get("/joke", function(req, res){
 var joke = "What do you call a dog that does magic tricks? A labracadabrador.";
 res.send(joke);
});

//Add a /register route:
app.post('/register', function(req,res){
  console.log(req.body)
  var person = {
     email: req.body.email
  };
  
  connection.query('INSERT INTO users SET ?', person, function(err, result) {
   if(err) throw err;
   // console.log(err);
   console.log(result);
   res.redirect("/");
  });
});

//Add a /random_num route:
app.get("/random_num", function(req, res){
 var num = Math.floor((Math.random() * 10) + 1);
 res.send("Your lucky number is " + num);
});

//nodeJs server
app.listen(8080, function () {
 console.log('App listening on port 8080!');
});

//Remember to start the server up:
//node app.js 