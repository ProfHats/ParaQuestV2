const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const StatGainSchema = new Schema({
type: {type: String, default:""},
amount: {type: Number, default:0},
limit: {type: Number, default:0}
});

const NextSchema = new Schema({
id: {type: String, default:""},
btnText: {type: String, default:""}
});

const TestSchema = new Schema({
name: {type: String, default:""},
threshold: {type: Number, default:0},
statRequired: {type: String, default:""},
onSuccess: {type: String, default:""},
onFail: {type: String, default:""}	
});

const AdventureSchema = new Schema({
id: {type: String, index: {unique: true}}, //need an array to store two vars, one that shows the id id unique
text: String,
previous: String,
statGain: [StatGainSchema],
next: [NextSchema],
tests: [TestSchema]	
});

export default mongoose.model('adventures', AdventureSchema);