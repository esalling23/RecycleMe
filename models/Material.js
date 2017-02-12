/**
 * (Site name here) 
 * 
 * Material page Model
 * @module Material
 * @class Material
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Material model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Material = new keystone.List('Material', 
	{
		label: 'Materials',
		singular: 'Material',
		track: true,
		autokey: { path: 'material_key', from: 'name', unique: true },
	});

/**
 * Model Fields
 * @main Material
 */
Material.add({

	name: { type: String, label: 'Name', required: true, initial: true },

	info: { type: Types.Markdown, label: 'Material Info', required: true, initial: true},
	image: { type: Types.CloudinaryImage, label: 'Material Image'},
	status: { type: Types.Select, label: 'What should be done with this material?', options: 'Recycle, Trash, Compost', required: true, initial: true},
	rationale: { type: Types.Markdown, label: 'Why do you do this with this material?'},
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }

});

/**
 * Model Registration
 */
Material.defaultSort = '-createdAt';
Material.defaultColumns = 'name, updatedAt';
Material.register();
