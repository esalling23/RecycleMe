var keystone = require('keystone'),
    Player = keystone.list('Player'),
    Team = keystone.list('Team'),
    appRoot = require('app-root-path'),
    TemplateLoader = require(appRoot + '/lib/TemplateLoader'),
    _ = require('underscore');

exports.board = function(req, res) {

    var Templates = new TemplateLoader(), 
        locals = res.locals, 
        data = {}
        data.teams = [];

    locals.section = 'leaderBOARD';

    data.subsection = 'leader';

    Player.model.find({"leader":{$ne:null}})
    .populate('team')
    .sort('-leader')
    .exec(function(err, player){


        data.individuals = player;

        _.each(player, (p) => {
            if (!p.team)
                return;

            if (_.where(data.teams, {team:p.team.name}).length == 0) {
                var team = p.team.name;
                data.teams.push({team: p.team.name, score: 0});
            }
            
            _.where(data.teams, {team: p.team.name})[0].score += p.leader;

        });

        data.teams = _.sortBy(data.teams, '-score');

        Templates.Load('/partials/board', data, function(html) {

            res.send(html);

        }); 

    });

    
};