/**
 * (Site name here) 
 * 
 * CSV page Model
 * @module CSV
 * @class CSV
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * CSV model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var CSV = new keystone.List('CSV', 
	{
		label: 'CSV files',
		singular: 'CSV file',
		autokey: { path: 'key', from: 'name', unique: true },
	});

var myStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
        path: keystone.expandPath('./public/uploads/files'), // required; path where the files should be stored
        publicPath: '/public/uploads/files', // path where files will be served
    }
});

/**
 * Model Fields
 * @main CSV
 */
CSV.add({

	name: { type: String, label: 'Name', required: true, initial: true },
	file: { type: Types.File, label: 'CSV file', storage: myStorage }

});

CSV.schema.pre('save', function(next) {

	console.log(this.file)


    	next();
});

/**
 * Model Registration
 */
CSV.defaultSort = '-createdAt';
CSV.defaultColumns = 'name, updatedAt';
CSV.register();
