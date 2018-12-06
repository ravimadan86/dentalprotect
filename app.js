const express = require('express');
var app = express();

// Connecting database
require('./startup/db')();

// Loading passport config
require('./config/passport')();

// Loading middlewares
require('./startup/middleware')(app);

//Loading routes
require('./startup/routes')(app);

// Connecting to server
const port = process.env.PORT || '5000';
app.listen(port, ()=>{
  console.log('Server started...');
});
