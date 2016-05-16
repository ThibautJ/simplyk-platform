var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//Opportunity schema creation
var Opp = mongoose.model('Opp', new mongoose.Schema({
	id: ObjectId,
	intitule: String,
	oName: String,
	nbBenevoles: Number,
	date: Date,
	lat: Number,
	lon: Number,
	mail: String,
	candidates: []
}));

module.exports = {"Opp": Opp};

