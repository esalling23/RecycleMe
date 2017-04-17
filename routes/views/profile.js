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
    _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'profile';

    view.on('init', function(next) {

        var queryPlayer = Player.model.findOne({ 'id': req.params.id }, {}, {});

        queryPlayer.exec(function(err, result) {
            if (err) throw err;

            locals.player = result;

            next();

        });

    });

    // Render the view
    view.render('profile');

};
