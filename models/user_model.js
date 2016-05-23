var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var User = mongoose.model('Users', new Schema({
	id: ObjectId,
	name: String,
	email: String
}));

module.exports = User;
