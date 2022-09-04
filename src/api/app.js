require('dotenv').config()
const express =  require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path')
const routes = require('./routes')
const dbStartup = require('../configs/database')
const app = express()

// CORS
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

// Static file
app.use('/static/uploads', express.static(path.join(__dirname, '../public/uploads')))


// Custom Response Format
app.use(require('../configs/responseFormat'))

// when run code start  connect db
dbStartup()

// Routes
app.use('/apis',routes)
console.log(process.env.NODE_ENV != "development");


// Error handler
require('../configs/errorHandles')(process.env.NODE_ENV != "development", app)

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

module.exports = app