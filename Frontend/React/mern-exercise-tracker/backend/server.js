 const express = require('express');
 const cors = require('cors');
 const mongoose = require('mongoose');
 const bodyParser = require("body-parser");
 
 require('dotenv').config();

 //create express server
 const  app = express();
 const port = process.env.port || 5000;

 //middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
 

 const uri = process.env.ATLAS_URI;
 mongoose.connect(uri, { useNewUrlParser : true, useUnifiedTopology: true});
 const connection = mongoose.connection;
 connection.on("error", console.error.bind(console, "connection error: "));
 connection.once('open', ()=>{
    console.log('MongoDB database connection established successfully');
 });
 



 const usersRouter = require('./routes/users'); 
 app.use('/users', usersRouter);
 
 const exercisesRouter = require('./routes/exercises'); 
 app.use('/exercises', exercisesRouter);



 app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
 });
