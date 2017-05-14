var _ = require('underscore');
var hbs = require('handlebars');

module.exports = function() {

    var _helpers = {};

    /**
     * Local HBS Helpers
     * ===================
     */
     _helpers.lowercase = function (str) {

        return str.toLowerCase(); 

    };

    return _helpers;


};