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
	material: {
		type: Types.Relationship, 
		ref: 'Material', 
		label: 'Material(s)',
		many: true
	},
	status: { type: Types.Select, label: 'What should be done with this material?', options: 'Recycle, Trash, Compost, E-Waste', required: true, initial: true},
	rationale: { type: Types.Markdown, label: 'Why do you do this with this item?'},
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
Item.defaultSort = '-createdAt';
Item.defaultColumns = 'name, updatedAt';
Item.register();
