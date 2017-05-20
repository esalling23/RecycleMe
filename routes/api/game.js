var keystone = require('keystone');
var Player = keystone.list('Player');
var Item = keystone.list('Item'),
    appRoot = require('app-root-path'),
    TemplateLoader = require(appRoot + '/lib/TemplateLoader'),
    _ = require('underscore');


exports.update = function(req, res) {

    var grade = '', 
        ratio,
        level = req.query.level, 
        score = req.query.score, 
        locals = res.locals, 
        Templates = new TemplateLoader();

    var groupByLevel = function(val, cat) {
        return val.filter(function(item) {
            return item.level == cat;
        });
    };

    var grader = function(score, total) {
        console.log(score, total);
        ratio = score/total;
        console.log(ratio);
        // Turn that grade into a letter!
        if (ratio >= 0.9) {
            grade = 'A';
        } else if (ratio >= 0.8) {
            grade = 'B';
        } else if (ratio >= 0.7) {
            grade = 'C';
        } else if (ratio >= 0.5) {
            grade = 'D';
        } else if (ratio >= 0.0) {
            grade = 'F';
        }

        return grade;
    };

    Item.model.find({}).exec((err, items) => {

        Player.model.findOne({ '_id': req.query.id }).exec((err, player) => {

            if (err) throw err;

            var totalOne = groupByLevel(items, 'One').length;
            var totalTwo = groupByLevel(items, 'Two').length;
            var totalThree = groupByLevel(items, 'Three').length;
            var passed;

            if (player.new)
                player.new = false;

            // Check the level, then set the grade for that level
            if (level == 1) {

                player.lastTryOne = Date.now();

                if (!player.triesOne)
                    player.triesOne = 1;
                else 
                    player.triesOne++;

                grade = grader(score, totalOne);

                // If the player passed...
                if (grade == 'A' || grade == 'B' || grade == 'C') {

                    player.pointsOne = score;
                    
                    if (!player.gradeOne || player.gradeOne == 0){
                        console.log(ratio);
                        player.gradeOne = ratio * 100;
                        player.gradeOneCap = (totalOne-score) + (totalOne/2);
                        player.levelOne = true;
                    } else {
                        player.gradeOne = ratio * 100;
                    }

                }

            } else if (level == 2) {

                player.lastTryTwo = Date.now();

                if (!player.triesTwo)
                    player.triesTwo = 1;
                else 
                    player.triesTwo++;
                
                // If the player passed...
                if (grade == 'A' || grade == 'B' || grade == 'C') {

                    passed = true;

                    player.pointsTwo = score;

                    if (!player.gradeTwo || player.gradeTwo == 0){
                        player.gradeTwo = score * 100;
                        player.gradeTwoCap = (totalTwo - score) + (totalTwo/2);
                        player.levelTwo = true; 
                    } else {
                        player.gradeTwo = ratio * 100;
                    }
                } else 
                    passed = false;

            } else if (level == 3) {

                player.lastTryThree = Date.now();

                if (!player.triesThree)
                    player.triesThree = 1;
                else 
                    player.triesThree++;

                // If the player passed...
                if (grade == 'A' || grade == 'B' || grade == 'C') {

                    player.pointsThree = score;

                    if (!player.gradeThree || player.gradeThree == 0) {
                        player.gradeThree = ratio * 100;
                        player.gradeThreeCap = score + ((totalThree - score)/2);
                        player.levelThree = true;
                    } else {
                        player.gradeThree = ratio * 100;
                    }
                }

            }

            player.leader = player.pointsOne + player.pointsTwo + player.pointsThree;

            if (player.levelOne && player.levelTwo && player.levelThree) {
                player.completed = true;
            }

            player.save();

            var data = {
                player: player, 
                passed: passed
            };

            Templates.Load('/partials/end', data, function(html) {

                res.send({html:html, grade:ratio*100});

            }); 

            

        });

    });

};