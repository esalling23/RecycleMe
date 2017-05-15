var keystone = require('keystone'),
    Player = keystone.list('Player'),
    appRoot = require('app-root-path'),
    TemplateLoader = require(appRoot + '/lib/TemplateLoader'),
    _ = require('underscore');

exports.board = function(req, res) {

    var Templates = new TemplateLoader(), 
        locals = res.locals;

    Player.model.find({"leader":{$ne:null}})
    .sort('leader')
    .exec(function(err, player){
        console.log(player)
        var players = player;

        Templates.Load('/partials/board', players, function(html) {

            res.send(html);

        }); 

    });

    
};