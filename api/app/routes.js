var User = require('../app/models/user');

module.exports = function(app, passport) {

	//temp
	app.all('*', function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		next();
	});

    // handles login
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/'
        //failureFlash: true
    }))

    // handles signup
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/'
        //failureFlash: true
    }))

    app.get('/profile', function(req, res){
    	res.send('succesful signup')
    })

    app.get('/', function(req, res){
    	res.send('validation has failed')
    })

    app.get('/:username', function(req, res){
    	//todo
    })

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