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
};

// get a workout
userSchema.methods.getWorkout = function (id) {
	for(var i=0; i<this.workouts.length; i++) {
		if(this.workouts[i].id === id) return this.workouts[i];
	}
};

// update workout
userSchema.methods.updateWorkout = function (id, name, sets, reps, weight) {
	for(var i=0; i<this.workouts.length; i++) {
		if(workouts[i].id === id) {
			var workout = workouts[i];
			workout.name = name;
			workout.sets = sets;
			workout.reps = reps;
			workout.weight = weight;
		}
	}
};

module.exports = mongoose.model('User', userSchema);
