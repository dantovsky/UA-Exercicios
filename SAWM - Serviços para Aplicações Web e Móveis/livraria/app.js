var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Swagger
const swaggerUI = require('swagger-ui-express');
var fs = require('fs');
var jsyaml = require('js-yaml');
var spec = fs.readFileSync('swagger.yaml', 'utf8');
swaggerDocument = jsyaml.load(spec);

var indexRouter = require('./routes/index');
var livrariaRouter = require('./routes/livraria');

var app = express();

// Express built-in middleware functions to support JSON-encoded
app.use(express.json()); // Preciso disso?
app.use(express.urlencoded({ extended: true })); // Preciso disso?

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Swagger
app.use(
  '/api-docs',
  swaggerUI.serve ,
  swaggerUI.setup(swaggerDocument)
)

// Base endpoinst
app.use('/', indexRouter);
app.use('/livraria', livrariaRouter);

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

module.exports = app;
