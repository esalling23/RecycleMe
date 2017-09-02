var keystone = require('keystone');
var Types = keystone.Field.Types;
// var nodemailer = require('nodemailer');

/**
 * Player Model
 * ==========
 */

var Player = new keystone.List('Player', {
	label: 'Players',
	singular: 'Player'
	// autokey: { path: 'key', from: 'name', unique: true }
});

Player.add({
	name: { type: Types.Name, required: true, index: true },
	username: { type: String, label: 'Username', note: 'If exists, used instead of name'},
	image: { type: Types.CloudinaryImage, label: 'Profile Picture', folder: 'RecycleMe/Players' },
	email: { type: Types.Email, initial: true, required: true },
	password: { type: Types.Password, initial: true, required: true }, 
	admin: { type: Boolean, label: 'Admin', note: 'For player creation login'}
}, 'Player Data', {
	new: { type: Boolean, label: 'New Player?', default: true },
	login: { type: Boolean, label: 'Have they logged in?', default: false },

	leader: { type: Number, label: 'Leaderboard Points'},
	team: { 
		type: Types.Relationship, 
		ref: 'Team', 
		label: 'Player Team',
	},

	completed: { type: Boolean, label: 'Game Completed?', note: 'Enables free play level' }
}, 'Level One Data', {

	levelOne: { type: Boolean, label: 'Level One Completed?', note: 'Based on score of 70% or higher', noedit: false },
	pointsOne: { type: Number, label: 'Level One Points (#)', noedit: false, default: 0 },
	gradeOne: { type: Number, label: 'Level One Grade (% out of total)', noedit:false, default: 0 }, 
	triesOne: { type: Number, label: 'Number of Times Played This Level', noedit:false, default: 0 }, 
	lastTryOne: { type: Date, noedit: true }

}, 'Level Two Data', {

	levelTwo: { type: Boolean, label: 'Level Two Completed?', note: 'Based on score of 70% or higher', noedit: false }, 
	pointsTwo: { type: Number, label: 'Level One Points (#)', noedit: false, default: 0 },
	gradeTwo: { type: Number, label: 'Level Two Grade (% out of total)', noedit:false, default: 0 },
	triesTwo: { type: Number, label: 'Number of Times Played This Level', noedit:false, default: 0 },
	lastTryTwo: { type: Date, noedit: true }
	
}, 'Level Three Data', {

	levelThree: { type: Boolean, label: 'Level Three Completed?', note: 'Based on score of 70% or higher', noedit: false }, 
	pointsThree: { type: Number, label: 'Level Three Points (#)', noedit: false, default: 0 },
	gradeThree: { type: Number, label: 'Level Three Grade (% out of total)', noedit:false, default: 0 }, 
	triesThree: { type: Number, label: 'Number of Times Played Level Three', noedit:false, default: 0 },
	lastTryThree: { type: Date, noedit: true }
	
});


Player.schema.statics.removeResourceRef = function(resourceId, callback) {

    Player.model.update({
            $or: [{
                'team': resourceId
            }]
        },

        {
            $pull: {
                'team': resourceId
            }
        },

        {
            multi: true
        },

        function(err, result) {

            callback(err, result);

            if (err)
                console.error(err);
        }
    );

};

// Player.schema.post('save', function(next){
// 	if (this.levelOne && this.levelTwo && this.levelThree) {
// 		this.completed = true;
// 		this.save();
// 		next();
// 	} else 
// 		next();
	
// });

// Player.schema.post('save', function(next) {
//     // Not the movie transporter!
//     var transporter = nodemailer.createTransport({
//         service: 'Gmail',
//         auth: {
//             user: 'esalling23@gmail.com', // Your email id
//             pass: 'Faefanzel23!' // Your password
//         }
//     });

//     // setup email data with unicode symbols
// 	var mailOptions = {
// 	    from: '"Fred Foo 👻" <esalling23@gmail.com.com>', // sender address
// 	    to: this.email, // list of receivers
// 	    subject: 'Hello ✔', // Subject line
// 	    text: 'Hello world ?', // plain text body
// 	    html: '<b>Hello world ?</b>' // html body
// 	};

// 	// send mail with defined transport object
// 	transporter.sendMail(mailOptions, (error, info) => {
// 	    if (error) {
// 	        return console.log(error);
// 	    }
// 	    console.log('Message %s sent: %s', info.messageId, info.response);
// 	});
	
// 	next();
// });


/**
 * Registration
 */

Player.defaultColumns = 'name, levelOne, levelTwo, levelThree';
Player.register();
