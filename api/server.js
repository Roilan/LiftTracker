// REQUIRE
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var morgan = require('morgan'); //dev

// DB
var configDB = require('./config/database.js');
console.log('connecting to database...');
mongoose.connect(configDB.url, function (err) {
	if (err) console.log(err);
	else console.log('connected to database');
});

// PASSPORT CONFIG
require('./config/passport')(passport);

// EXPRESS CONFIG
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// SESSION CONFIG
app.use(session({ secret: 'placeholder' })); // session secret
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
require('./app/routes.js')(app, passport);

// LAUNCH
var port = process.env.PORT || 8080;
app.listen(port, function (err) {
	if (err) console.log(err);
	else console.log('listening on port: ' + port);
});
