// Invoke 'strict' JavaScript mode
'use strict';
var multer  = require('multer'),
	storage = multer.diskStorage({
			  destination: function (req, file, cb) {
			    cb(null, 'public/shared')
			  },
			  filename: function (req, file, cb) {
			    cb(null, file.originalname)
			  }
	}),
	upload = multer({ storage: storage });

// Define the routes module' method
module.exports = function(app) {
	// Load the 'index' controller
	var index = require('../controllers/index.server.controller');

	
	// Mount the 'index' controller's 'render' method
	app.get('/', index.render);


	// accept one file where the name of the form field is named photho
	app.post('/upload', upload.single('sampleFile'), index.uploadFile);
	
};