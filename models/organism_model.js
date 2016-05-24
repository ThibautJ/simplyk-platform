var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Organism = mongoose.model('Organism', new Schema({
	id: ObjectId,
	name: String,
	email: String
}));

module.exports = Organism;
