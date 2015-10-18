"use strict";

var mongoose= require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;


	var UserSchema = new Schema({
		firstName: String,
		lastName: String,

		email:{
			type:String,
			match:[/.+\@.+\..+/, 'Please enter a valid email']
		},
		username:{
			type: String,
			required: 'Username is required',
			unique: true,
			trim: true
		},
		password:{
			type: String,
			validate:[
				function(password){
					return password && password.length; 
				}, 'password should be longer'
			]
		},

		provider: {
			type: String,
			required: 'Provider is requied'
		},
		providerId: String,
		providerData: {},
		salt: String

	});

	


	UserSchema.virtual('fullName').get(function(){
		return this.firstName + ' ' + this.lastName;
	}).set(function(fullName){
		var splitName = fullName.splitName(' ');
		this.firstName = splitName[0] || '';
		this.lastName = splitName[1] || '';
	});


	UserSchema.pre('save', function(next){
		if(this.password){
			this.salt = new Buffer(crypto.randomBytes(16), 'base64').toString('base64');
			this.password = this.hashPassword(this.password);
		}

		next();
	})



	UserSchema.methods.hashPassword = function(password){
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	};


	UserSchema.methods.authenticate = function(password){
		return this.password === this.hashPassword(password);

	};

	UserSchema.statics.findUniqueUsername = function(username, suffix, callback){
		var _this = this;
		var possibleUsername = username + suffix || '';
		_this.findOne({
			username: possibleUsername
		}, function(err, user){
			if(!err){
				if(!user){
					return callback(possibleUsername);
				}else{
					return _this.findUniqueUsername(username, (suffix || 0)+ 1, callback);
				}
			}else {
				return callback(null);
			}
		});
	};

	UserSchema.set('JSON', {
		getterts: true,
		virtuals: true
	});

	mongoose.model('User', UserSchema);