var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({

    local        : {
        email    : String,
        password : String,
    },

    username	 : String,
    createdAt    : { type: Date, default: Date.now },
    workouts     : [String]
});

// methods =========================================================

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// sets workout
userSchema.methods.setWorkout = function(name, sets, reps, weight) {
	var workout = {
	    'date'  : Date.now(),
	    'name'  : name,
		'sets'	: sets,
		'reps'	: reps, 
		'weight': weight 
    }

    this.workouts.push(JSON.stringify(workout));
	this.save();
    return workout;
};

// get workouts
userSchema.methods.getWorkouts = function () {
	return this.workouts;
}

userSchema.methods.getWorkout = function (id) {
	//todo
}

module.exports = mongoose.model('User', userSchema);
