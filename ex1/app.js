var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

var mongoDB = 'mongodb://mongodb:27017/contratos'
mongoose.connect(mongoDB)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB'))
db.once('open', () => {
  console.log("Conexão ao MongoDB realizada com sucesso")
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contratosRouter = require('./routes/contratos');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contratos', contratosRouter)

module.exports = app;
