var keystone = require('keystone');
var Player = keystone.list('Player');
var Item = keystone.list('Item'),
    appRoot = require('app-root-path'),
    TemplateLoader = require(appRoot + '/lib/TemplateLoader'),
    _ = require('underscore');


exports.update = function(req, res) {

    var grade = '', 
        ratio,
        passed = false,
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
        ratio = score/total;
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

        console.log(grade);

        return grade;
    };

    Item.model.find({}).exec((err, items) => {

        Player.model.findOne({ '_id': req.query.id }).exec((err, player) => {

            if (err) throw err;

            if (player.new)
                player.new = false;

            // Check the level, then set the grade for that level
            if (level == 1) {

                var total = groupByLevel(items, 'One').length;

                player.lastTryOne = Date.now();

                if (!player.triesOne)
                    player.triesOne = 1;
                else 
                    player.triesOne++;

                grade = grader(score, total);

                // If the player passed...
                if (grade == 'A' || grade == 'B' || grade == 'C') {

                    passed = true;

                    score = parseInt(score);
                    player.pointsOne = score;
                    
                    if (!player.gradeOne || player.gradeOne == 0){
                        player.gradeOne = ratio * 100;
                        player.pointsOneCap = score;
                        player.levelOne = true;
                    } else {
                        player.gradeOne = ratio * 100;
                    }

                }

            } else if (level == 2) {

                var total = groupByLevel(items, 'Two').length;

                player.lastTryTwo = Date.now();

                if (!player.triesTwo)
                    player.triesTwo = 1;
                else 
                    player.triesTwo++;

                grade = grader(score, total);
                
                // If the player passed...
                if (grade == 'A' || grade == 'B' || grade == 'C') {

                    passed = true;

                    player.pointsTwo = score;

                    if (!player.gradeTwo || player.gradeTwo == 0){
                        player.gradeTwo = score * 100;
                        player.pointsTwoCap = score;
                        player.levelTwo = true; 
                    } else {
                        player.gradeTwo = ratio * 100;
                    }
                } else 
                    passed = false;

            } else if (level == 3) {

                var totalThree = groupByLevel(items, 'Three').length;

                player.lastTryThree = Date.now();

                if (!player.triesThree)
                    player.triesThree = 1;
                else 
                    player.triesThree++;

                grade = grader(score, total);

                // If the player passed...
                if (grade == 'A' || grade == 'B' || grade == 'C') {

                    passed = true;

                    player.pointsThree = score;

                    if (!player.gradeThree || player.gradeThree == 0) {
                        player.gradeThree = ratio * 100;
                        player.pointsThreeCap = score;
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
                passed: passed, 
                score: score, 
                total: total, 
                grade: grade
            };

            Templates.Load('/partials/end', data, (html) => {

                res.send({ html: html, grade: ratio*100 });
 
            }); 

        });

    });

};

exports.level = function(req, res) {

    var Templates = new TemplateLoader();

    var level = function(val, cat) {
        return val.filter(function(item) {
            return item.level == cat || item.level == upperCase(cat);
        });
    };

    Item.model.find({}).exec((err, item) => {

        data.items = categorize(item, req.query.level);

        Player.model.findOne({ '_id': req.query.player }).exec((err, player) => {

            data.player = player;

            Templates.Load('/partials/level', data, (html) => {

                res.send({ html: html });

            });

        });
    });

};

exports.modal = function(req, res) {

    var Templates = new TemplateLoader();

    Item.model.findOne({ '_id': req.query.id }).exec((err, item) => {

        Player.model.findOne({ '_id': req.query.player }).exec((err, player) => {

                Templates.Load('/partials/level', data, (html) => {

                    res.send({ html: html });

                });

        });
    });

};