let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');
let session = require('express-session');
let passport = require('passport');
let cors = require('cors');

let configDb = require('./config/database');
mongoose.connect(configDb.uri, { useNewUrlParser: true });

let app = express();

require('./config/passport')(passport);

app.options('*', cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(session({
    secret: 'this is my secret key',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


let indexRouter = require('./routes/index');
let loginRouter = require('./routes/login');
let logoutRouter = require('./routes/logout');
let usersRouter = require('./routes/users');
let profileRouter = require('./routes/profile');
let eventsRouter = require('./routes/events');
let companiesRouter = require('./routes/companies');

app.use('/', isLoggedIn, indexRouter);
app.use('/login', loginRouter);
app.use('/logout', isLoggedIn, logoutRouter);
app.use('/profile', isLoggedIn, profileRouter);
app.use('/api/db/users', isLoggedIn, usersRouter);
app.use('/api/db/events', isLoggedIn, eventsRouter);
app.use('/api/db/companies', isLoggedIn, companiesRouter);

module.exports = app;


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.status(400).json({
        'message': 'access denied'
    });
}