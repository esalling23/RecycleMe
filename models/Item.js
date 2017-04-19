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
var _ = require('underscore');
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
		autokey: { path: 'item_key', from: 'name', unique: true }
	});

/**
 * Model Fields
 * @main Item
 */
Item.add({

	name: { type: String, label: 'Name', required: true, initial: true },
	info: { type: Types.Markdown, label: 'Item Info'},
	image: { type: Types.CloudinaryImage, label: 'Item Image'},
	material: {
		type: Types.Relationship, 
		ref: 'Material', 
		label: 'Material(s)',
		many: true
	},
	status: { type: Types.Select, label: 'What should be done with this item?', options: 'Recycle, Trash, Compost, Special', required: true, initial: true},
	special: { type: String, label: 'What kind of special thing should be done with this item?', dependsOn: {status:'Special'}},
	rationale: { type: Types.Markdown, label: 'Why do you do this with this item?'},
	level: { type: Types.Select, label: 'On which level will this appear?', options: 'One, Two, Three'},
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }

});

Item.schema.statics.removeResourceRef = function(resourceId, callback) {

    Item.model.update({
            $or: [{
                'material': resourceId
            }]
        },

        {
            $pull: {
                'material': resourceId
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
 * Model Registration
 */
Item.defaultSort = 'level';
Item.defaultColumns = 'name, level, status, updatedAt';
Item.register();
