var keystone = require('keystone'),
    Player = keystone.list('Player'),
    Team = keystone.list('Team'),
    appRoot = require('app-root-path'),
    TemplateLoader = require(appRoot + '/lib/TemplateLoader'),
    _ = require('underscore');

exports.get = function(req, res) {

    var Templates = new TemplateLoader(), 
        data = {};

    data.subsection = 'profile';

    Team.model.find({}).exec(function(err, result){

        data.teams = result;

        Player.model.findOne({ _id: req.body.player }).populate('team').exec(function(err, result){

            data.player = result;

            Templates.Load('/partials/profile', data, function(html) {

                res.send(html);

            }); 

        });
    });

    
};

exports.update = function(req, res) {

    console.log(req, res);

    Team.model.findOne({ _id: req.query.team }).exec((err, result) => {

        var team = result._id;

        Player.model.findOne({ _id: req.query.player }).populate('team').exec((err, result) => {

            result.team = team;

            if (req.query.username)
                result.username = req.query.username;

            result.save();

            console.log(result, "wow");

            res.send('success')
        });
    });

};
