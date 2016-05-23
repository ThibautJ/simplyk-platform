var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//Opportunity schema creation
var Opp = mongoose.model('Opp', new Schema({
	id: ObjectId,
	intitule: String,
	oName: String,
	nbBenevoles: Number,
	date: Date,
	address: String, //Full adress for convenience
	lat: Number,
	lon: Number,
	mail: String,
	users: [{
		id: { type: Schema.Types.ObjectId, ref: 'Users' },
		status: String
	}]
}));

module.exports = Opp;
