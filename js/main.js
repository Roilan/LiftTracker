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


	//Sign up Password check
	// Initial hide and disable on load
	$('.formSignup span').hide();
	$('.btnSignup').prop('disabled', true);

	// Checks if password is 8 characters or longer
	function passCheck() {
		if ($(this).val().length >= 8) {
			$(this).next().hide();
			$('.formSignup span').next().prop('disabled', false);
		} else {
			$(this).next().show();
		}
	}

	$('.signupPass').on('focus', passCheck).keyup(passCheck);

});