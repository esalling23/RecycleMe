var keystone = require('keystone');
var Player = keystone.list('Player');
var Item = keystone.list('Item'),
    appRoot = require('app-root-path'),
    TemplateLoader = require(appRoot + '/lib/TemplateLoader'),
    _ = require('underscore');


exports.update = function(req, res) {

    var grade = '', 
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
        var ratio = score/total;
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

            var totalOne = groupByLevel(items, 'One');
            var totalTwo = groupByLevel(items, 'Two');
            var totalThree = groupByLevel(items, 'Three');

            // Check the level, then set the grade for that level
            if (level == 1) {
                if (!player.triesOne)
                    player.triesOne = 1;
                else 
                    player.triesOne++;

                grade = grader(score, totalOne);

                // If the player passed...
                if (grade == 'A' || grade == 'B' || grade == 'C') {
                    if (!player.gradeOne){
                        player.gradeOne = ratio * 100;
                        player.gradeOneCap = ratio * 100;
                        player.levelOne = true;
                    } else 
                        player.gradeOneCap = ratio * 100;
                }

            } else if (level == 2) {

                if (!player.triesTwo)
                    player.triesTwo = 1;
                else 
                    player.triesTwo++;
                
                // If the player passed...
                if (grade == 'A' || grade == 'B' || grade == 'C') {
                    if (!player.gradeTwo){
                        player.gradeTwo = score * 100;
                        player.gradeTwoCap = score * 100;
                        player.levelTwo = true; 
                    } else 
                        player.gradeTwoCap = score * 100;            
                }

            } else if (level == 3) {

                if (!player.triesThree)
                    player.triesThree = 1;
                else 
                    player.triesThree++;

                // If the player passed...
                if (grade == 'A' || grade == 'B' || grade == 'C') {
                    if (!player.gradeThree) {
                        player.gradeThree = ratio * 100;
                        player.gradeThreeCap = ratio * 100;
                        player.levelThree = true;
                    } else 
                        player.gradeThreeCap = ratio * 100;
                }

            }

            player.leader = ((player.gradeOneCap/100)*totalOne) + ((player.gradeTwoCap/100)*totalTwo) + ((player.gradeThreeCap/100)*totalThree);

            if (player.levelOne && player.levelTwo && player.levelThree) {
                player.completed = true;
            }

            player.save();

            var data = player;

            Templates.Load('/partials/end', data, function(html) {

                res.send({html:html, grade:grade});

            }); 

            

        });

    });

};