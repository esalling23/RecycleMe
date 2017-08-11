/**
 * (Site name here)
 * Developed by Engagement Lab, 2016
 * ==============
 * Index page view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class Index
 * @author 
 *
 * ==========
 */
var keystone = require('keystone'),
    Player = keystone.list('Player'),
    Item = keystone.list('Item'),
    Team = keystone.list('Team'),
    SpecialOption = keystone.list('SpecialOption'),
    Game = keystone.list('Game'),
    _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'game';

    view.on('init', function(next) {
        // Locate this player 
        var queryPlayer = Player.model.findOne({ '_id': req.params.id }, {}, {}).populate('team');
        // Game Content
        var querySpecial = SpecialOption.model.find({}, {}, {});
        // Game Config
        var queryGame = Game.model.findOne({}, {}, {
                            sort: {
                                'createdAt': -1
                            }
                        });

        queryPlayer.exec(function(err, result) {
            if (err) throw err;

            locals.player = result;
            locals.playerId = result._id;
            locals.score = result.leader;

            querySpecial.exec(function(err, result) {
                if (err) throw err;

                locals.special = result;

                queryGame.exec(function(err, result) {
                    if (err) throw err;

                    locals.config = result;

                    // Leaderboard
                    Player.model.find({"leader":{$ne:null}})
                    .populate('team')
                    .sort('-leader')
                    .exec(function(err, player){
                        if (err) throw err;

                        locals.individuals = _.first(player, 10);

                        var data = { teams : [] };

                        _.each(locals.individuals, function(p) {
                            if (!p.team)
                                return;

                            if (_.where(data.teams, {team:p.team.name}).length == 0) {
                                var team = p.team.name;
                                data.teams.push({team: p.team.name, score: 0});
                            }
                            
                            _.where(data.teams, {team: p.team.name})[0].score += p.leader;

                        });

                        locals.leaderTeams = _.sortBy(data.teams, '-score');

                        Team.model.find({}).exec(function(err, team){

                            locals.teams = _.first(team, 10);

                            next(); 
                            
                        });

                    });

                });

            });

        });

    });

    // Render the view
    view.render('game');

};
