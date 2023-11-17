// Create web server application
// Run: node comments.js
// Access: http://localhost:3000
// Description: This web server will display the comments from the database.
//              It will also allow you to add a comment to the database.
//              It will also allow you to delete a comment from the database.
//              It will also allow you to edit a comment from the database.

// Import modules
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

// Set up database connection
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "comments"
});

// Connect to database
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// Create web server
var app = express();
// Set up body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set up static files
app.use(express.static('public'));

// Set up handlebars
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
// Set up handlebars views
app.set('view engine', 'handlebars');

// Set up port
app.set('port', 3000);

// Set up get request
app.get('/',function(req,res,next){
  var context = {};
  // Get comments from database
  con.query('SELECT * FROM comment', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    // Display comments from database
    var params = [];
    for(var row in rows){
      params.push({'id':rows[row].id, 'name':rows[row].name, 'comment':rows[row].comment});
    }
    context.results = params;
    res.render('home', context);
  });
});

// Set up post request
app.post('/',function(req,res,next){
  var context = {};
  // Add comment to database
  con.query("INSERT INTO comment (`name`, `comment`) VALUES (?,?)", [req.body.name, req.body.comment], function(err, result){
    if(err){
      next(err);
      return;
    }
    // Get comments from database
    con.query('SELECT * FROM comment', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }