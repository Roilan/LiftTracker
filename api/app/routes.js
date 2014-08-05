var User = require('../app/models/user');

module.exports = function(app, passport) {

	// LOGIN
	app.post('/api/login', function (req, res) {
		passport.authenticate('local-login',function (err, user, info) {
			if(user) {
				req.login(user, function (err) {
					if(err) console.log(err);
					res.json(user);
				});
			}
			else {
				res.json(info);
			}
		})(req, res);
	});

	// SIGNUP
	app.post('/api/signup', function (req, res) {
		passport.authenticate('local-signup',function (err, user, info) {
			if(user) {
				req.login(user, function (err) {
					if(err) console.log(err);
					res.json(user);
				});
			}
			else {
				res.json(info);
			}
		})(req, res);
	});

	// PROFILE
	app.get('/api/profile', isLoggedIn, function(req, res) {
		res.json(req.user);
	});

	// LOGOUT
	app.get('/api/logout', function(req, res) {
		req.logout();
		res.json('success');
	});

	// FIND A USER BY NAME
	app.get('/api/user/:username', function(req, res){

		User.findOne({ 'local.email' :  req.params.username }, function(err, user) {
			if(err) console.log(err);
			if(!user) res.json('user not found');
			else res.json(user);
		});
	});

	// FIND A USERS WORKOUTS
	app.get('/api/user/:username/workouts', function(req, res){

		User.findOne({ 'local.email' :  req.params.username }, function(err, user) {
			if(err) console.log(err);
			if(!user) res.json('user not found');
			else res.json(user.getWorkouts());
		});
	});

	// FIND A USERS WORKOUTS WITHIN RANGE
	app.get('/api/user/:username/workouts/:from-:to', function(req, res) {
		//todo
	});

	// SUBMIT NEW WORKOUTS
	app.post('/api/workouts', isLoggedIn, function(req, res){

		var info = req.body;

		if(info.name && info.sets && info.reps && info.weight) {
			res.json(req.user.setWorkout(info.name, info.sets, info.reps, info.weight));
		} else {
			res.json({'error':'missing fields'});
		}
	});

	// EDIT WORKOUT
	//todo
	// DELETE WORKOUT
	//todo
	// CHANGE PASSWORD
	//todo
	// CHANGE USERNAME
	//todo
	// CHANGE EMAIL
	//todo

	// FIND ALL USERS
	app.get('/api/allusers', function(req, res){
		User.find(function (err, users) {
			if(err) console.log(err);
			else res.json(users);
		});
	});
};

// is user authenticated?
function isLoggedIn(req, res, next) {

	if (req.isAuthenticated()) { 
		return next(); 
	} else {
		console.log(req.user);
		res.json({'error':'not authenticated'});
	}
}