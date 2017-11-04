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
    Game = keystone.list('Game'),
    _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'index';

    view.on('init', function(next) {

        var queryGame = Game.model.findOne({}, {}, {
                            sort: {
                                'createdAt': -1
                            }
                        });

        queryGame.exec(function(err, result) {
            if (err) throw err;

            locals.config = result;
            next();

        });

    });

    // Render the view
    view.render('index');

};
