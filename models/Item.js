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
	status: { type: Types.Select, label: 'Status', note: 'This is determined by item materials', options: 'Recycle, Trash', noedit: true },
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }

});

Item.schema.post('save', function(next){
	var status;
		Item.model.findOne({item_key: this.item_key}).populate('material').exec(function(err, result){
			console.log(result, " is the resulty");
			
	    var matStat = _.countBy(result.material, function (material) {
	        return material.status;
	    });

	    console.log(matStat, " status options");

	    if (matStat.Recycle > matStat.Trash) {
	        result.status = 'Recycle';
	        status = result.status;
	        console.log(status, " status");
	    } else {
	        result.status = 'Trash';
	        status = result.status;
	        console.log(status, " status");
	    }

	    Item.model.update({item_key: result.item_key}, 
		    {
		    	$set: {
		    		status: status
		    	}
		    }, 
		    {
					multi: false
		    }, 
		    function(err, result) {

		    	console.log(status, " updating");

          if (err)
              console.error(err);
	      }
      );
	  
		});

		
		
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
