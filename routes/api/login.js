var keystone = require('keystone');
var Player = keystone.list('Player');
var _ = require('underscore');

exports.get = function(req, res) {

	var locals = res.locals;
	var query = Player.model.findOne({email:req.query.email});	

	console.log(req.query)

	query.exec(function (err, player) {

		console.log(player, " is the player")

	    if (err || !player) return res.json({ msg: "we have not found your profile" });

	    player._.password.compare(req.query.password, function(err, result){

			if (result) {

				console.log("login successful");

		  		res.send('/profile/' + result.id);
			    
			  } else {

			  	console.log("wrong password");

			  	return res.json({
			        success: false,
			        msg: 'Sorry, wrong password'
			    });
			  	
			  }
	    });
	});
};