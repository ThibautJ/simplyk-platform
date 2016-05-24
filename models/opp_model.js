var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//Opportunity schema creation
var Opp = mongoose.model('Opp', new Schema({
	intitule: String,
	oName: String,
	nbBenevoles: Number,
	date: Date,
	address: String, //Full adress for convenience
	lat: Number,
	lon: Number,
	mail: String,
	applications: [{
		applicant: { type: Schema.Types.ObjectId, ref: 'User' },
		status: String,
		story: String
	}]
}));

module.exports = Opp;
