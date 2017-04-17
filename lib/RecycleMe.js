'use strict';

var shuffle = require('./ShuffleUtil');

class RecycleMe {

		constructor() {

		var Templates,
		keystone;

	  }

	  Initialize(session) {

		console.log("initialize");

		// Init template loader with current game type - Credit to JR
		var TemplateLoader = require('./TemplateLoader');
		this.Templates = new TemplateLoader();

		this.keystone = require('keystone');

		// this.playerData = {
		//   
		// };


		
	 }


	 StartGame(socket) {

		this.gameSocket = socket;

	 }

}

module.exports = FakeNews;