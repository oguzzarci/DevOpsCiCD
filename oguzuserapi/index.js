const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dontenv = require('dotenv');
const requestRoutes = require('./routers/request');

dontenv.config();
app.use(express.json());
app.use(requestRoutes);

//Debug Connection
//mongoose.connect(process.env.DEBUG_DB_CONNECT, {useNewUrlParser: true,useUnifiedTopology: true });

const dbUrl = process.env.NODE_ENV_DB_URL
const dbUser = process.env.NODE_ENV_DB_USER
const dbPass = process.env.NODE_ENV_DB_PASS
const dburi = `mongodb://${dbUser}:${dbPass}@${dbUrl}/userdb`

//Prod Connection
mongoose.connect(dburi, {useNewUrlParser: true,useUnifiedTopology: true },()=>console.log('Connect to db!'));

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error:'));
 
db.once('open', function() {
  console.log("Successfully connected to MongoDB!");
});

app.listen(5000, () => console.log('User Server Up and runnig'));