$(document).ready(function() {

	$('.btnDay').on('click', function() {
		var setDay = prompt('What exercise day is it?');

		$('.setDate').text(setDay);
	});

	$('form').submit(function(event) {
		var $name = $('#name').val();
		var $sets = $('#sets').val();
		var $reps = $('#reps').val();
		var $weight = $('#weight').val();

		function addExercise(exercise) {
			$('ul').append('<li>' + exercise + '</li>');

			$('input').val('');
		}

		addExercise($name);
		addExercise($sets);
		addExercise($reps);
		addExercise($weight);

		event.preventDefault();
	});

});