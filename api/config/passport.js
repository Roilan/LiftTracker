var LocalStrategy   = require('passport-local').Strategy;
var User       		= require('../app/models/user');

module.exports = function(passport) {

    // passport session setup ==================================================

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // LOCAL SIGNUP ============================================================

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // pass back the entire request to the callback
    },
    function(req, email, password, done) {

        User.findOne({ 'local.email' :  email }, function(err, user) {

            if (err) return done(err);

            if (user) return done(null, false, { error: 'email is taken' }); //email is already taken

            else { 

                // create user
                var newUser            = new User();
                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password);

				// save user
                newUser.save(function(err) {
                    if (err) console.log(err);
                    return done(null, newUser);
                });
            }
        });
    }));

    // LOCAL LOGIN =============================================================

    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // pass back the entire request to the callback
    },
    function(req, email, password, done) {

        User.findOne({ 'local.email' :  email }, function(err, user) {

            if (err) return done(err);

            if (!user) return done(null, false, { error: 'user does not exist!' });

            if (!user.validPassword(password)) return done(null, false, { error: 'Ooops! wrong password' });

            else return done(null, user);
        });
    }));
};