/**
 * (Site name here) 
 * 
 * Team page Model
 * @module Team
 * @class Team
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Team model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Team = new keystone.List('Team', 
	{
		label: 'Teams',
		singular: 'Team',
		track: true,
		autokey: { path: 'key', from: 'name', unique: true }
	});

/**
 * Model Fields
 * @main Team
 */
Team.add({

	name: { type: String, label: 'Title of this special option', required: true, initial: true },
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }

});

Team.relationship({ ref: 'Player', refPath: 'team' });


/**
 * Model Registration
 */
Team.defaultSort = '-createdAt';
Team.defaultColumns = 'name, updatedAt';
Team.register();
