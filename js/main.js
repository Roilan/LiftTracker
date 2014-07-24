$(document).ready(function() {

	$('.btnDay').on('click', function() {
		var setDay = prompt('What exercise day is it?');

		$('.setDate').text(setDay);
	});

	$('form').submit(function(event) {
		var $inputFirst = $('input:first').val();

		$('ul').append('<li>' + $inputFirst + '</li>');
		event.preventDefault();
	});

});