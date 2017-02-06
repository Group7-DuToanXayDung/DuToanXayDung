// JavaScript Document
$(function() {

    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
		$(this).addClass('active');
		e.preventDefault();
	});
});