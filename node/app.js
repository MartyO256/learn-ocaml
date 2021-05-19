const express = require('express');
const app = express();
const database = process.env.DB_CONN;
const port = process.env.PORT;
const compile_collection = process.env.COMP_COLLECTION;
const eval_collection = process.env.EVAL_COLLECTION;
const mongoose = require('mongoose');

app.use(express.json());

// connect to database
// mongoose.connect('mongodb://172.17.0.1/learn-ocaml-code');
mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true} );
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Access Control
app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', '*');
    next();
  });


app.post("/grade", function (req, res)
{
  if (req.body)
  {
    const split_array = req.body;
    const collection = split_array[3];
    let parsedSolStr = split_array[4];
    const obj = new Object();
    obj.studentId = split_array[1];
    obj.timestamp = new Date().toString();
    obj.solution = parsedSolStr;
    const jsonString = JSON.stringify(obj);
    const solution = JSON.parse( jsonString ); // parse req.body as an object
    db.collection(collection).insertOne(solution);
    console.log(solution);
    res.sendStatus(200); // success status
  }
  else
  {
    res.sendStatus(400); // error status
  }
});


// receive the POST from the client javascript file
app.post("/compile", function (req, res)
{
  if (req.body)
  {
    const split_array = req.body;
    const collection = split_array[3];
    let parsedSolStr = split_array[4];
    const obj = new Object();
    obj.studentId = split_array[1];
    obj.timestamp = new Date().toString();
    obj.solution = parsedSolStr;
    const jsonString = JSON.stringify(obj);
    const solution = JSON.parse( jsonString ); // parse req.body as an object
    db.collection(collection).insertOne(solution);
    console.log(solution);
    res.sendStatus(200); // success status
  }
  else
  {
    res.sendStatus(400); // error status
  }
});  

app.post("/eval", function (req, res)
{
  if (req.body)
  {
    const split_array = req.body;
    const collection = split_array[3];
    let parsedSolStr = split_array[4];
    const obj = new Object();
    obj.studentId = split_array[1];
    obj.timestamp = new Date().toString();
    obj.solution = parsedSolStr;
    const jsonString = JSON.stringify(obj);
    const solution = JSON.parse( jsonString ); // parse req.body as an object
    db.collection(collection).insertOne(solution);
    console.log(solution);
    res.sendStatus(200); // success status
  }
  else
  {
    res.sendStatus(400); // error status
  }
});  



app.listen(port, () => {
  console.log(`Server running on port${port}`);
});