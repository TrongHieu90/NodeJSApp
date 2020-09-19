var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var $ = require('jquery');

var static = express.static(path.join(__dirname, 'public'));
var app = express();
const port = 8080;
require('dotenv').config();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//use static html page
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//set the path of the jquery file to be used from the node_module jquery package
app.use('/jquery',express.static(path.join(__dirname+'/node_modules/jquery/dist/')));
app.use(static);

//Dont use routes for now
//app.use('/', indexRouter);
//app.use('/users', usersRouter);

app.get('/ajaxCall', (req, res) =>
{
  var key = process.env.API_KEY
  //console.log(key)
  res.send(key);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

if (!module.parent) {
  app.listen(port);
  console.log(`Express started on port ${port}`);
}

module.exports = app;
