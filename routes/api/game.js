var keystone = require('keystone');
var Player = keystone.list('Player');
var _ = require('underscore');

exports.update = function(req, res) {

    var grade = '', 
        level = req.query.level, 
        score = req.query.score, 
        locals = res.locals;

    Player.model.findOne({ '_id': req.query.id }).exec(function(err, player) {
        if (err) throw err;

        // Turn that grade into a letter!
        if (req.query.grade >= 0.9) {
            grade = 'A';
        } else if (req.query.grade >= 0.8) {
            grade = 'B';
        } else if (req.query.grade >= 0.7) {
            grade = 'C';
        } else if (req.query.grade >= 0.5) {
            grade = 'D';
        } else if (req.query.grade >= 0.0) {
            grade = 'F';
        }

        // Check the level, then set the grade for that level
        if (level == 1) {
            player.gradeOne = req.query.grade * 100;
            // If that player hasn't already passed...
            if (!player.levelOne) {
                // If the player passed...
                if (grade == 'A' || grade == 'B' || grade == 'C') {
                    player.levelOne = true;
                     // Set the overall score
                    if(player.leader)
                        player.leader = player.leader + parseInt(score);
                    else 
                        player.leader = parseInt(score);
                }
            } else {

            }
        } else if (level == 2) {
            player.gradeTwo = req.query.grade * 100;
            // If that player hasn't already passed...
            if (!player.levelTwo) {
                // If the player passed...
                if (grade == 'A' || grade == 'B' || grade == 'C') {
                    player.levelTwo = true;
                     // Set the overall score
                    if(player.leader)
                        player.leader = player.leader + parseInt(score);
                    else 
                        player.leader = parseInt(score);
                }
            } else {

            }

        } else if (level == 3) {
            player.gradeThree = req.query.grade * 100;
            // If that player hasn't already passed...
            if (!player.levelThree) {
                // If the player passed...
                if (grade == 'A' || grade == 'B' || grade == 'C') {
                    player.levelThree = true;
                    // Set the overall score
                    if(player.leader)
                        player.leader = player.leader + parseInt(score);
                    else 
                        player.leader = parseInt(score);
                }
            }

        }

        if (player.levelOne && player.levelTwo && player.levelThree) {
            player.completed = true;
        }

        player.save();

        res.send(grade);

    });

};