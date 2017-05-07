const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const CharacterSchema = new Schema({
	id: String,
	strength: Number,
	brains: Number,
	charm: Number,
	injuries: Number,
	stress: Number,
	scandal: Number
});

export default mongoose.model('chars', CharacterSchema);