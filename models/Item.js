/**
 * (Site name here) 
 * 
 * Item page Model
 * @module Item
 * @class Item
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Item model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Item = new keystone.List('Item', 
	{
		label: 'Items',
		singular: 'Item',
		track: true,
		autokey: { path: 'item_key', from: 'name', unique: true },
	});

/**
 * Model Fields
 * @main Item
 */
Item.add({

	name: { type: String, label: 'Name', required: true, initial: true },

	info: { type: Types.Markdown, label: 'Item Info'},
	image: { type: Types.CloudinaryImage, label: 'Item Image'},
	isRecycle: { type: Types.Boolean, label: 'Is Recyclable?'},
	//material field with relationship to materials?
	
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }

});

/**
 * Model Registration
 */
Item.defaultSort = '-createdAt';
Item.defaultColumns = 'name, updatedAt';
Item.register();
