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
	password: { type: Types.Password, initial: true, required: true }
}, 'Player Data', {
	levelOne: { type: Boolean, label: 'Level One Completed?', note: 'Based on score of 70% or higher', noedit: true },
	gradeOne: { type: Number, label: 'Level One Grade (%)', noedit:true }, 
	levelTwo: { type: Boolean, label: 'Level Two Completed?', note: 'Based on score of 70% or higher', noedit: true }, 
	gradeTwo: { type: Number, label: 'Level Two Grade (%)', noedit:true },
	levelThree: { type: Boolean, label: 'Level Three Completed?', note: 'Based on score of 70% or higher', noedit: true }, 
	gradeThree: { type: Number, label: 'Level Three Grade (%)', noedit:true }, 
	leader: { type: Number, label: 'Leaderboard Points' }, 
	completed: { type: Boolean, label: 'Game Completed?' }
});




/**
 * Registration
 */

Player.defaultColumns = 'name, levelOne, levelTwo, levelThree';
Player.register();
