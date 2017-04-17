var keystone = require('keystone');
var Player = keystone.list('Player');
var appRoot = require('app-root-path');
var TemplateLoader = require('../../lib/TemplateLoader');
var Templates = new TemplateLoader();
var _ = require('underscore');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');


exports.get = function(req, res) {

	var locals = res.locals;
	

	var query = Player.model.findOne({email:req.body.email});

	query.select('name email');

	query.exec(function (err, person) {
		console.log ("person:" + person + ":person");
	    if (err) return handleError("we have not found your person" + err);
	  // console.log('This is %s with password %s and email %s.', person.userName, person.passWord, person.email);
	  // var data = {username:person.userName, password:person.passWord, email:person.email};

	  // console.log(data._.password);

	    person._.passWord.compare(req.body.password, function(err, result){

			if (result) {

			  	var data;
			  	data = {
				  	player: {
				  		name:person.name, 
				  		email:person.email
				  	}, 
				  	info: {
				  		
				  	}
		  		};
			  	

			  } else {

			  	return res.apiError('error', 'wrong password');
			  	locals.section = 'login:error';
			  	// res.apiResponse('wrong password');
			  	
			  	// io.emit("login:error", req.query.username);
			  	console.log("wrong password");

			  }
	    });
		// pass._.compare(passwordInput)
	  
	});

};