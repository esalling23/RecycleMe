/**
 * (Site name here) 
 * 
 * SpecialOption page Model
 * @module SpecialOption
 * @class SpecialOption
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * SpecialOption model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var SpecialOption = new keystone.List('SpecialOption', 
	{
		label: 'Special Options',
		singular: 'Special Option',
		track: true,
		autokey: { path: 'key', from: 'name', unique: true }
	});

/**
 * Model Fields
 * @main SpecialOption
 */
SpecialOption.add({

	name: { type: String, label: 'Title of this special option', required: true, initial: true },
	text: { type: Types.Markdown, label: 'Short description', required: true, initial: true},
	image: { type: Types.CloudinaryImage, label: 'Special Option Image'},
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }

});

SpecialOption.relationship({ ref: 'Item', refPath: 'specialStatus' });
SpecialOption.relationship({ ref: 'Item', refPath: 'specialStatusOr' });


/**
 * Model Registration
 */
SpecialOption.defaultSort = '-createdAt';
SpecialOption.defaultColumns = 'name, updatedAt';
SpecialOption.register();
