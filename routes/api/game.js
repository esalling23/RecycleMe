var keystone = require('keystone');
var Game = keystone.list('Game');
var appRoot = require('app-root-path');
var TemplateLoader = require('../../lib/TemplateLoader');
var Templates = new TemplateLoader();
var _ = require('underscore');


exports.create = function(req, res) {

	var locals = res.locals;
	locals.section = 'newGame';

	console.log(req.body);

	var game = req.body.userame + '-game';
	
    new Game.model({
   	  name: game

    })
    .save(function(err) {

		if (err)
	    console.log(err);
	  else 
	  	console.log ("success");

	});

};

