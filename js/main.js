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

		function addExercise() {
			if ($name && $sets && $reps && $weight != '') {
				$('.nameList').append('<li>' + $name + '</li>');
				$('.setList').append('<li>' + $sets + '</li>');
				$('.repsList').append('<li>' + $reps + '</li>');
				$('.weightList').append('<li>' + $weight + '</li>');

				$('input').val('');			
			} else {
				alert('Error, empty fields.');
			}
		}

		addExercise();
		event.preventDefault();
	});

});