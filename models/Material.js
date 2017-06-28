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
var Item = keystone.list('Item');

/**
 * Material model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Material = new keystone.List('Material', 
	{
		label: 'Materials',
		singular: 'Material',
		autokey: { path: 'material_key', from: 'name', unique: true },
	});

/**
 * Model Fields
 * @main Material
 */
Material.add({

	name: { type: String, label: 'Name', required: true, initial: true },
	info: { type: Types.Markdown, label: 'Material Info', required: true, initial: true},
	image: { type: Types.CloudinaryImage, label: 'Material Image'}

});

Material.relationship({ ref: 'Item', refPath: 'material' });

Material.schema.post('remove', function(next) {

	var id = this._id;
    // Remove all the assignment docs that reference the removed person.
    Item.model.find({ material: id }, function(err, result){
    	console.log(result);
    	result.material = _.without(result.material, id);
    	console.log(_.without(result.material, id));
    	result.schema.save();
    	console.log(result);

    	next();
    });
});

/**
 * Model Registration
 */
Material.defaultSort = '-createdAt';
Material.defaultColumns = 'name, updatedAt';
Material.register();
