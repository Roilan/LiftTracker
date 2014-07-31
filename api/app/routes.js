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

	// 

	// LOGOUT =======================================================
	app.get('/api/logout', function(req, res) {
		req.logout();
		res.json('success');
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