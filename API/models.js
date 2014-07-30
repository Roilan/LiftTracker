var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

	email	 : String,
	user 	 : String,
	password : String
});

module.exports = mongoose.model('User', userSchema);