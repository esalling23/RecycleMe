var keystone = require('keystone');
var Player = keystone.list('Player');
var _ = require('underscore');

exports.update = function(req, res) {

    console.log(req, res);

    Player.model.findOne({ '_id': req.query.id }).exec(function(err, player) {
        if (err) throw err;

        if(player.leader)
	        player.leader = player.leader + parseInt(req.query.score);
	    else 
	    	player.leader = parseInt(req.query.score);
	    
        player.save();

        res.send('did it')

    });

};

