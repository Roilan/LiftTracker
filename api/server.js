var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

// DB ==================================================================================

var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

// PASSPORT CONFIG =====================================================================

require('./config/passport')(passport);

// EXPRESS CONFIG ======================================================================

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// SESSION =============================================================================

app.use(session({ secret: 'placeholder' })); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// ROUTES ==============================================================================

require('./app/routes.js')(app, passport);

// LAUNCH ==============================================================================

app.listen(port);
