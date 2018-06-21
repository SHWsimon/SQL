// Documentation for the MySQL Node Package: 
// Step 1: Install the MySQL Node Package
// npm install mysql; 


// Step 2: Connect to Database
var mysql = require('mysql');
var faker=require("faker");

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'simonwang210',  //your username
  database : 'join_us'         //the name of your db
});


// Step 3: Run Queries
// Using the MySQL Node Package:
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
   if (error) throw error;
   console.log('The solution is: ', results[0].solution);
});

// Example1
var q = 'SELECT CURTIME() as time, CURDATE() as date, NOW() as now';
connection.query(q, function (error, results, fields) {
  if (error) throw error;
  console.log(results[0].time);
  console.log(results[0].date);
  console.log(results[0].now);
});

// Example2 : To SELECT all users from database
var q = 'SELECT * FROM users ';
connection.query(q, function (error, results, fields) {
  if (error) throw error;
  console.log(results[0]);
});

// Example3 : To count the number of users in the database:
var q = 'SELECT COUNT(*) AS total FROM users ';
connection.query(q, function (error, results, fields) {
  if (error) throw error;
  console.log(results[0].total);
});

// Example4 : Insert data
var person = {
    email: faker.internet.email(),
    created_at: faker.date.past()
};
var end_result = connection.query('INSERT INTO users SET ?', person, function(err, result) {
  if (err) throw err;
  console.log(result);
});

// Example5 : Insert 500 data
var data = [];
for(var i = 0; i < 500; i++){
    data.push([
        faker.internet.email(),
        faker.date.past()
    ]);
}
var q = 'INSERT INTO users (email, created_at) VALUES ?';
connection.query(q, [data], function(err, result) {
  console.log(err);
  console.log(result);
});

// ========================================================
connection.end();
