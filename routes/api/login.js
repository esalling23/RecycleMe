var keystone = require('keystone');
var Player = keystone.list('Player');
var _ = require('underscore');

exports.get = function(req, res) {

	var locals = res.locals;
	var query = Player.model.findOne({email:req.query.email});	

	query.exec((err, player) => {

	    if (err || !player) return res.json({ error_code: "no_profile", msg: "no profile for that email" });

	    var data = {};
	    data.player = player.id;

	    player._.password.compare(req.query.password, (err, result) => {

			if (result) {

				if (!player.login)
					player.login = true;

				if (player.new)
					data.new = true;

				player.save();

		  		res.send('/profile/' + data.player);
			    
			} else {

			  	console.log("wrong password");

			  	res.send({
			        error_code: "wrong_password",
			        msg: 'Sorry, wrong password'
			    });
			    return;
			  	
			}

	    });
	    
	});
};