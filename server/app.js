let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let userDetail = require('./routes/userDetail');
let configDb = require('./config/database');
mongoose.connect(configDb.uri).then((value => 'Connected to database'), (value => { throw "Error connect to database"}));

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/userDetail', userDetail);

module.exports = app;
