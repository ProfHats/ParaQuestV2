const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const ItemSchema = new Schema({
	id: String,
	name: String,
	text: String,
	charges: Number
});

export default mongoose.model('items', ItemSchema);