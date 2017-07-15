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

        console.log (req.query, req.files)

        result.getUpdateHandler(req).process( req.files, {
            flashErrors: true,
            fields: 'image',
            errorMessage: 'There was a problem saving your profile: '
        }, function(err) {
            if (err) { console.log(err); }

            res.apiResponse({
                msg: 'success'
            });
        });

        result.save();

        console.log(result, "wow");

        res.send('success')
    });

};

// /**
//  * Update File by ID
//  */
// exports.image_update = function(req, res) {
//   FileData.model.findById(req.params.id).exec(function(err, item) {
//     if (err) return res.apiError('database error', err);
//     if (!item) return res.apiError('not found');

//     var data = (req.method == 'POST') ? req.body : req.query;

//     item.getUpdateHandler(req).process(data, function(err) {

//       if (err) return res.apiError('create error', err);

//       res.apiResponse({
//         collection: item
//       });

//     });
//   });
// }

// /**
//  * Upload a New File
//  */
// exports.image_create = function(req, res) {

//   var item = new FileData.model(),
//   data = (req.method == 'POST') ? req.body : req.query;

//   item.getUpdateHandler(req).process(req.files, function(err) {

//     if (err) return res.apiError('error', err);

//     res.apiResponse({
//       file_upload: item
//     });

//   });
// }


exports.image_upload = function(req, res) {
    console.log(req.files, " image_upload");

    Player.model.findOne({ _id: req.params.id }).populate('team').exec((err, result) => {

        

        // .process(req.files, function(err) {
 
        //     if (err) return res.apiError('error', err);

        //     console.log(result, " uploaded image");

 
        // });

    });

};
