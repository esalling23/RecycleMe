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
		autokey: { path: 'Game_key', from: 'name', unique: true }
	});

/**
 * Model Fields
 * @main Game
 */
Game.add({

	name: { type: String, label: 'Name', required: true, initial: true },
	favicon: { type: Types.CloudinaryImages, label: 'Favicon Images', folder:'RecycleMe'}, 
	icon: { type: Types.CloudinaryImage, label: 'Meta Search Icon', folder: 'RecycleMe'},
	title: { type: String, label: 'Meta Description'},
	description: { type: Types.Textarea, label: 'Meta Description'},

	defaultProfilePic: { type: Types.CloudinaryImage, folder: 'RecycleMe', label: 'Default Profile Picture'},

	rulesPictures: { type: Types.CloudinaryImages, folder: 'RecycleMe', label: 'Rules Pictures'},
	rulesText: { type: Types.TextArray, label: 'Rules Picture Captions'},

	countdown: { type: Number, label: '# of Seconds during Get-Ready countdown'},
	speed: { type: Number, label: '# of Seconds per item in speed level'}
	
});

Game.schema.pre('save', function(next) {

    // Save state for post hook
	if (this.rulesPictures.length > 0 && (this.rulesText.length < this.rulesPictures.length)) {
        var err = new Error('You cannot have more images than captions.');
        next(err);
    }

    if (this.rulesText.length > 0 && (this.rulesPictures.length < this.rulesText.length)) {
        var err = new Error('You cannot have more captions than images.');
        next(err);
    }

    next();

});

/**
 * Model Registration
 */
Game.defaultSort = '-createdAt';
Game.defaultColumns = 'name, updatedAt';
Game.register();
