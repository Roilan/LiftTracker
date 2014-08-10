$(document).ready(function() {

	$('.btnDay').on('click', function() {
		var setDay = prompt('What exercise day is it?');

		$('.setDate').text(setDay);
	});

	$('.formLog').submit(function(event) {
		var $name = $('#name').val();
		var $sets = $('#sets').val();
		var $reps = $('#reps').val();
		var $weight = $('#weight').val();

		function addExercise() {
			if ($name && $sets && $reps && $weight != '') {
				// Adds input to list item
				$('.nameList').append('<li>' + $name + '</li>');
				$('.setList').append('<li>' + $sets + '</li>');
				$('.repsList').append('<li>' + $reps + '</li>');
				$('.weightList').append('<li>' + $weight + '</li>');

				// Clear input values
				$('input').val('');			
			} else {
				alert('Error, empty fields.');
			}
		}

		event.preventDefault();
		addExercise();
	});

	// Validates email through regular expression
	function validateEmail($emailVal) {
		 var regex = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
		 
		 if (regex.test($emailVal)) {
		 	return true;
		 }	else {
		 return false;
		 }
	}

	//Sign up Password check
	// Initial hide and disable on load
	$('.formSignup span').hide();
	$('.btnSignup').prop('disabled', true);

	// Checks if password is 8 characters or longer
	function passCheck() {
		if ($(this).val().length >= 8 && $(this).val().length < 101) {
			$(this).next().hide();
			$('.formSignup span').next().prop('disabled', false);
		} else {
			$(this).next().show();
			$('.formSignup span').next().prop('disabled', true);
		}
	}

	$('.signupPass').on('focus', passCheck).keyup(passCheck);


	//Submit button
	$('.btnSignup').on('click', function(event) {
		//event.preventDefault();

		var $emailVal = $('.signupEmail').val();

		if (validateEmail($emailVal) == false) {
			alert('Invalid email');
		}
	});
});