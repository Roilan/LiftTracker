var User = require('../app/models/user');
var Workout = require('../app/models/workout');

module.exports = function(app, passport) {

	// LOGIN =======================================================
	app.post('/api/login', passport.authenticate('local-login', {failureFlash:true}), 
	function (req, res) {

		if(req.user) {
			res.json(req.user);
		} else {
			res.json(req.flash('loginMessage')); //tofix
		}
	});

	// SIGNUP ======================================================
	app.post('/api/signup', passport.authenticate('local-signup'), 
	function (req, res) {

		if(req.user) {
			res.json(req.user);
		} else {
			res.json(req.flash('signupMessage')); //tofix
		}
	});

	// PROFILE ======================================================
	app.get('/api/profile', isLoggedIn, function(req, res) {
		res.json(req.user);
	});

	// LOGOUT =======================================================
	app.get('/api/logout', function(req, res) {
		req.logout();
		res.json('success');
	});

	// FIND USER BY NAME ============================================
	app.get('/api/user/:username', function(req, res){

		User.findOne({ 'local.email' :  req.params.username }, function(err, user) {
			if(err) throw err;
			if(!user) res.json('user not found');
			else res.json(user);
		});
	});

	app.get('/api/user/:username/workouts', function(req, res){

		User.findOne({ 'local.email' :  req.params.username }, function(err, user) {
			if(err) throw err;
			if(!user) res.json('user not found');
			else res.json(user.workouts);
		});
	});

	app.post('/api/workouts', isLoggedIn, function(req, res){

		var workout = {
	        date    : Date.now(),
	        name    : req.body.name   || 'default',
	        sets	: req.body.sets	  || 'default',
	        reps	: req.body.reps   || 'default',
	        weight	: req.body.weight || 'default'
    	}

    	console.log(req.body);

		req.user.workouts.push(JSON.stringify(workout));
		req.user.save();

		res.json(req.user.workouts);
	});

	app.get('/api/allusers', function(req, res){
		User.find(function (err, users) {
			if(err) throw err;
			res.json(users);
		});
	});
};

// is user authenticated?
function isLoggedIn(req, res, next) {

	if (req.isAuthenticated()) { 
		return next(); 
	} else {
		res.json('not authenticated');
	}
}