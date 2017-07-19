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
		autokey: { path: 'item_key', from: 'name', unique: true }
	});

/**
 * Model Fields
 * @main Item
 */
Item.add({

	name: { type: String, label: 'Name', required: true, initial: true },
	image: { type: Types.CloudinaryImage, label: 'Item Image - Main', folder: 'RecycleMe', autocleanup: true }

});

Item.schema.statics.removeResourceRef = function(resourceId, callback) {

    Item.model.update({
            $or: [{
                'material': resourceId
            }, {
				'specialStatus':resourceId
            }, {
                'specialStatusOr':resourceId
            }]
        },

        {
            $pull: {
                'material': resourceId,
                'specialStatus':resourceId, 
                'specialStatusOr':resourceId
            }
        },

        {
            multi: true
        },

        function(err, result) {
        	console.log(result);

            callback(err, result);

            if (err)
                console.error(err);
        }
    );

};

/**
 * Model Registration
 */
Item.defaultSort = 'profiles';
Item.defaultColumns = 'name, level, status, profiles, updatedAt';
Item.register();
