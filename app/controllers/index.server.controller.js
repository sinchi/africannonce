// Invoke 'strict' JavaScript mode
'use strict';


// Create a new 'render' controller method
exports.render = function(req, res) {
	// Use the 'response' object to render the 'index' view with a 'title' and a stringified 'user' properties
	res.render('index', {
		title: 'Hello World',
		image: '',
		user: JSON.stringify(req.user),
		messages : req.flash('error') || req.flash('info')
	});
};







