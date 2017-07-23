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

    var data = {};

    Player.model.findOne({ _id: req.params.id }).populate('team').exec((err, result) => {

        if (req.body.team) {
            result.team = req.body.team;
        }

        if (req.body.username) {
            result.username = req.body.username;
            data.username = req.body.username;
        }

        result.save();

        Team.model.findOne({ _id: result.team }).exec((err, result) => {
            
            data.team = result;

            res.send(data);

        });

    });

};


exports.image_upload = function(req, res) {

    Player.model.findOne({ _id: req.params.id }).exec((err, result) => {

        result.getUpdateHandler(req).process(req.body, function(err) {
 
            if (err) return res.apiError('error', err);

            res.send('success');

        });

    });

};
