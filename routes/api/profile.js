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

        res.send('success')
    });

};

exports.image_upload = function(req, res) {
    console.log(req.files, " image_upload");

    Player.model.findOne({ _id: req.params.id }).populate('team').exec((err, result) => {

        var updater = result.getUpdateHandler(req);

        var fields = 'name,username,email,image,password,admin,new,login,leader,team,completed,levelOne,pointsOne,pointsOneCap,triesOne,lastTryOne,levelTwo,pointsTwo,pointsTwoCap,triesTwo,lastTryTwo,levelThree,pointsThree,pointsThreeCap,triesThree,lastTryThree';

        var opt = ['name', 'email', 'password'];

        for(var i=0;i<opt.length;i++){
            if(result.hasOwnProperty(opt[i])){
                if( result[opt[i]].length == 0){
                    continue;
                }
                fields +=','+opt[i];
            }
        }

        updater.process( req.query, {
            flashErrors: true,
            fields: fields,
            errorMessage: 'There was a problem saving your profile: '
        }, function(err) {
            if (err) { console.log(err); }

            res.apiResponse({
                msg: 'success'
            });
        });

        // .process(req.files, function(err) {
 
        //     if (err) return res.apiError('error', err);

        //     console.log(result, " uploaded image");

 
        // });

    });

};
