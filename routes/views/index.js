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
    Index = keystone.list('Index'),
    Item = keystone.list('Item'),
    Material = keystone.list('Material'),
    _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'index';

    view.on('init', function(next) {

        var queryIndex = Index.model.findOne({}, {}, {
            sort: {
                'createdAt': -1
            }
        });
        queryIndex.exec(function(err, resultIndex) {
            if (err) throw err;

            locals.index = resultIndex;

            var queryItem = Item.model.find({}, {}, {
                sort: {
                    'createdAt': -1
                }
            })
            .populate('material');

            queryItem.exec(function(err, result) {
                if (err) throw err;

                locals.item = result;

                // _.each (locals.item, function(item){

                //     var status = _.countBy(item.material, function (material) {
                //         return material.status ? 'trash' : 'recycle';
                //     });
                //     console.log(status);

                //     if (status.recycle) {
                //         item.status = 'recycle';
                //     } else {
                //         item.status = 'trash';
                //     }

                //     console.log(item.status);

                // });
                

                // var queryMaterials = Material.model.findOne({}, {}, {
                //     sort: {
                //         'createdAt': -1
                //     }
                // });
                // queryItem.exec(function(err, result) {
                //     if (err) throw err;

                //     locals.materials = result;
                    
                    next();
                // });

            });

        });
    });

    // Render the view
    view.render('index');

};
