/**
 * (Site name here) 
 * 
 * Game page Model
 * @module Game
 * @class Game
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Game model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Game = new keystone.List('Game', 
	{
		label: 'Games',
		singular: 'Game',
		track: true,
		autokey: { path: 'Game_key', from: 'name', unique: true }
	});

/**
 * Model Fields
 * @main Game
 */
Game.add({

	name: { type: String, label: 'Name', required: true, initial: true },
	defaultProfilePic: { type: Types.CloudinaryImage, folder: 'RecycleMe', label: 'Default Profile Picture'},
	rulesPictures: { type: Types.CloudinaryImages, folder: 'RecycleMe', label: 'Rules Pictures'},
	
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }

});

/**
 * Model Registration
 */
Game.defaultSort = '-createdAt';
Game.defaultColumns = 'name, updatedAt';
Game.register();
