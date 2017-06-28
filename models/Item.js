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
	info: { type: Types.Markdown, label: 'Item Bio', note: 'Appears BEFORE player swipes item'},
	profilePic: { type: Types.CloudinaryImage, label: 'Item Image - Main', note: 'Appears on match screen - should be a repeat of one of the Image Profiles', folder: 'RecycleMe', autocleanup: true },
	profiles: { type: Types.CloudinaryImages, label: 'Image profiles', folder: 'RecycleMe', autocleanup: true },
	material: {
		type: Types.Relationship, 
		ref: 'Material', 
		label: 'Material(s)',
		many: true
	},
	status: { type: Types.Select, label: 'What should be done with this item?', options: 'Recycle, Trash, Compost, Special', required: true, initial: true},
	statusOr: { type: Types.Select, label: 'OR : What should be done with this item?', options: 'Recycle, Trash, Compost, Special'},
	specialStatus: { 
		type: Types.Relationship, 
		ref: 'SpecialOption',
		label: 'What kind of special thing should be done with this item?', 
		dependsOn: {status:'Special'}
	},
	specialStatusOr: { 
		type: Types.Relationship,
		ref: 'SpecialOption', 
		label: 'OR : What kind of special thing should be done with this item?', 
		dependsOn: {statusOr:'Special'}
	},

	rationale: { type: Types.Markdown, label: 'Correct Answer: Why do you do this with this item?'},
	rationaleAlt: { type: Types.Markdown, label: 'Wrong Answer: Why don\'t we do that with this item?'},
	level: { type: Types.Select, label: 'On which level will this appear?', options: 'One, Two, Three'},

	enabled: { type: Boolean, default: true, label: 'Enabled'}

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
