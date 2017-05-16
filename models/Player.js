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
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true }, 
	admin: { type: Boolean, label: 'Admin', note: 'For player creation login'}
}, 'Player Data', {
	new: { type: Boolean, label: 'New Player?', default: true },
	login: { type: Boolean, label: 'Have they logged in?', default: false },

	leader: { type: Number, label: 'Leaderboard Points' }, 
	team: { 
		type: Types.Relationship, 
		ref: 'Team', 
		label: 'Player Team',
	},

	completed: { type: Boolean, label: 'Game Completed?' },

	levelOne: { type: Boolean, label: 'Level One Completed?', note: 'Based on score of 70% or higher', noedit: true },
	gradeOne: { type: Number, label: 'Level One Grade (%)', noedit:false, default: 0 }, 
	gradeOneCap: { type: Number, label: 'Level One Grade Cap (%)', noedit:true, default: 0 },
	triesOne: { type: Number, label: 'Number of Times Played This Level', noedit:true }, 

	levelTwo: { type: Boolean, label: 'Level Two Completed?', note: 'Based on score of 70% or higher', noedit: true }, 
	gradeTwo: { type: Number, label: 'Level Two Grade (%)', noedit:false, default: 0 },
	gradeTwoCap: { type: Number, label: 'Level Two Grade Cap (%)', noedit:true, default: 0 },
	triesTwo: { type: Number, label: 'Number of Times Played This Level', noedit:true },

	levelThree: { type: Boolean, label: 'Level Three Completed?', note: 'Based on score of 70% or higher', noedit: true }, 
	gradeThree: { type: Number, label: 'Level Three Grade (%)', noedit:false, default: 0 }, 
	gradeThreeCap: { type: Number, label: 'Level Three Grade Cap (%)', noedit:true, default: 0 },
	triesThree: { type: Number, label: 'Number of Times Played This Level', noedit:true }
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
