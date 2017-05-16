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

            // If the player passed...
            if (grade == 'A' || grade == 'B' || grade == 'C') {
                if (!player.gradeOne){
                    player.gradeOne = req.query.grade * 100;
                    player.gradeThreeCap = req.query.grade * 100;
                    player.levelOne = true;
                } else 
                    player.gradeOneCap = req.query.grade * 100;
            }

        } else if (level == 2) {
            
            // If the player passed...
            if (grade == 'A' || grade == 'B' || grade == 'C') {
                if (!player.gradeTwo){
                    player.gradeTwo = req.query.grade * 100;
                    player.gradeTwoCap = req.query.grade * 100;
                    player.levelTwo = true; 
                } else 
                    player.gradeTwoCap = req.query.grade * 100;            
            }

        } else if (level == 3) {
        
            // If the player passed...
            if (grade == 'A' || grade == 'B' || grade == 'C') {
                if (!player.gradeThree) {
                    player.gradeThree = req.query.grade * 100;
                    player.gradeThreeCap = req.query.grade * 100;
                    player.levelThree = true;
                } else 
                    player.gradeThreeCap = req.query.grade * 100;
            }

        }

        player.leader = player.gradeOneCap + player.gradeTwoCap + player.gradeThreeCap;

        if (player.levelOne && player.levelTwo && player.levelThree) {
            player.completed = true;
        }

        player.save();

        res.send(grade);

    });

};