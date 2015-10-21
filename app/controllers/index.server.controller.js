// Invoke 'strict' JavaScript mode
'use strict';


// Create a new 'render' controller method
exports.render = function(req, res) {
	// Use the 'response' object to render the 'index' view with a 'title' and a stringified 'user' properties
	res.render('index', {
		title: 'Hello World',
		image: '',
		user: JSON.stringify(req.user)
	});
};


exports.uploadFile = function(req, res){
		    console.log(req.body) // form fields
		    console.log(req.file) // form files
		   // res.status(204).end();
		    return res.render('index',{
							     	user: JSON.stringify(req.user),
							     	title: 'upload Image',
							     	image: req.file.filename
							     });
		};




