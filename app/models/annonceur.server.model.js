'use strict';

var mongoose= require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

	var AnnonceurSchema = new Schema({

		role:{
			type: String,
			enum:['Admin', 'User']
		},

		type_annonceur:{
			type: String,
			enum:['particulier', 'professionnel']
		},
		nom:{
			type: String
		},
		telephone : String,
		ville:{
			type: Schema.ObjectId,
			ref: 'Ville'
		},
		email:{
			type:String,
			match:[/.+\@.+\..+/, 'repect valid format']
		},
		password:{
			type: String,
			validate:[
				function  (password) {
					return password && password.length > 6
				}, 'Password should be longer'
			]
		},
		salt: String,
		username:{
			type: String, 
			required: 'Username is required'
		},
		provider:{
			type: String, 
			required: 'provider is required'
		},
		providerId:String,
		providerData: {}

	});


	AnnonceurSchema.methods.isAdmin = function(role){
		return this.role === role;
	};


	AnnonceurSchema.methods.hashPassword = function(password){
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	};

	AnnonceurSchema.methods.authenticate = function(password){
		return this.password === this.hashPassword(password);
	};
	AnnonceurSchema.pre('save', function(next){
		if(this.password){
			this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
			this.password = this.hashPassword(this.password);
		}
		next();
	});

	AnnonceurSchema.statics.findUniqueUsername = function(username, suffix, callback){
		var _this = this;
		var possibleUsername = username + (suffix || '') ;

		_this.findOne({username: possibleUsername}, function(err, annonceur){
			if(!err){
				if(!annonceur){
					 callback(possibleUsername);
				}else{
					return _this.findUniqueUsername(username, (suffix || 0)+1, callback);
				}
			}else{
				 callback(null);
			}
		});

	};
	

	mongoose.model('Annonceur', AnnonceurSchema);