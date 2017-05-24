var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Player Model
 * ==========
 */

var Player = new keystone.List('Player', {
	label: 'Player',
	singular: 'Players',
	track: true
	// autokey: { path: 'key', from: 'name', unique: true }
});

Player.add({
	name: { type: Types.Name, required: true, index: true },
	username: { type: String, label: 'Username', note: 'If exists, used instead of name'},
	image: { type: Types.CloudinaryImage, label: 'Profile Picture', folder: 'RecycleMe/Players' },
	email: { type: Types.Email, initial: true, required: true, index: true },
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

	completed: { type: Boolean, label: 'Game Completed?' },

	levelOne: { type: Boolean, label: 'Level One Completed?', note: 'Based on score of 70% or higher', noedit: false },
	pointsOne: { type: Number, label: 'Level One Points (#)', noedit: false, default: 0 },
	pointsOneCap: { type: Number, label: 'Level One Grade Cap (#)', noedit:false, default: 0 },
	gradeOne: { type: Number, label: 'Level One Grade (% out of total)', noedit:false, default: 0 }, 
	triesOne: { type: Number, label: 'Number of Times Played This Level', noedit:false, default: 0 }, 
	lastTryOne: { type: Date, noedit: true },

	levelTwo: { type: Boolean, label: 'Level Two Completed?', note: 'Based on score of 70% or higher', noedit: false }, 
	pointsTwo: { type: Number, label: 'Level One Points (#)', noedit: false, default: 0 },
	pointsTwoCap: { type: Number, label: 'Level Two Grade Cap (#)', noedit:true, default: 0 },
	gradeTwo: { type: Number, label: 'Level Two Grade (% out of total)', noedit:false, default: 0 },
	triesTwo: { type: Number, label: 'Number of Times Played This Level', noedit:false, default: 0 },
	lastTryTwo: { type: Date, noedit: true },

	levelThree: { type: Boolean, label: 'Level Three Completed?', note: 'Based on score of 70% or higher', noedit: false }, 
	pointsThree: { type: Number, label: 'Level One Points (#)', noedit: false, default: 0 },
	pointsThreeCap: { type: Number, label: 'Level Three Grade Cap (#)', noedit:true, default: 0 },
	gradeThree: { type: Number, label: 'Level Three Grade (% out of total)', noedit:false, default: 0 }, 
	triesThree: { type: Number, label: 'Number of Times Played This Level', noedit:false, default: 0 },
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


/**
 * Registration
 */

Player.defaultColumns = 'name, levelOne, levelTwo, levelThree';
Player.register();
