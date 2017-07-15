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

    Player.model.findOne({ _id: req.params.id }).populate('team').exec((err, result) => {

        if (req.query.team)
            result.team = req.query.team;

        if (req.query.username)
            result.username = req.query.username;

        result.save();

        console.log(result, "wow");

        res.send('success');
    });

};


exports.image_upload = function(req, res) {
    console.log(req.body, " image_upload");

    Player.model.findOne({ _id: req.params.id }).exec((err, result) => {

        result.getUpdateHandler(req).process(req.body, function(err) {
 
            if (err) return res.apiError('error', err);

            console.log(result, " uploaded image");

            res.send('success');

        });

    });

};
