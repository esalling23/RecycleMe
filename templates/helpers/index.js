var _ = require('underscore');
var hbs = require('handlebars');

module.exports = function() {

    var _helpers = {};

    /**
     * Local HBS Helpers
     * ===================
     */

     _helpers.lettergrade = function (num) {
        var grade;
        
        if (num >= 0.9) {
            grade = 'A';
        } else if (num >= 0.8) {
            grade = 'B';
        } else if (num >= 0.7) {
            grade = 'C';
        } else if (num >= 0.5) {
            grade = 'D';
        } else if (num >= 0.0) {
            grade = 'F';
        }

        return grade; 

    };

    _helpers.listbump = function (num) {

        return num+1; 

    };

     _helpers.lowercase = function (str) {

        return str.toLowerCase(); 

    };




    _helpers.teamscore = function (team) {
        var score = 0;
        _.each(team, function(t){
            score += t.score;
        })

        return score; 

    };

    return _helpers;


};