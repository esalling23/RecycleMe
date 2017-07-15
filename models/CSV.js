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
var Player = keystone.List('Player');

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
    path: 'public/uploads/',
    publicPath: '/uploads',
  }, 
  schema: {
    originalname: true,
    url: true,
    path: true
  },
});

/**
 * Model Fields
 * @main CSV
 */
CSV.add({

	name: { type: String, label: 'Name', required: true, initial: true },
	csv: { type: Types.File, label: 'CSV file', storage: myStorage }

});

CSV.schema.post('save', function(next) {

	console.log(this.csv);

	var Converter = require("csvtojson");
    var fs = require("fs");
    //CSV File Path or CSV String or Readable Stream Object
    var csvFileName = this.csv.path;
    var fileStream = fs.createReadStream(csvFileName);
    //new converter instance
    var csvConverter = new Converter({constructResult:true});

    //end_parsed will be emitted once parsing finished
    csvConverter.on("end_parsed",function(jsonObj){
       console.log(jsonObj);
      var postJson = _.each(jsonObj, function(value,key){
        value.date = new Date(value.date).toISOString().slice(0, 10);
      });
      console.log(postJson);
      Player.model.find({}).remove().exec();
      keystone.createItems({
        Player: postJson
      },function(err, stats) {
        if (err) return res.json(err);
        //stats && console.log(stats.message);
        // res.redirect('/keystone/posts');
      });
    });

    //read from file
    fileStream.pipe(csvConverter);


    	// next();
});

/**
 * Model Registration
 */
CSV.defaultSort = '-createdAt';
CSV.defaultColumns = 'name, updatedAt';
CSV.register();
