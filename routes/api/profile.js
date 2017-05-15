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

            console.log(data);

            Templates.Load('/partials/profile', data, function(html) {

                res.send(html);

            }); 

        });
    });

    
};
