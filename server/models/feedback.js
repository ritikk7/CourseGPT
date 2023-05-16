const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	message: { type: Schema.Types.ObjectId, ref: 'Message', required: true },
	rating: { type: Number, required: true, min: 1, max: 5 },
	comment: { type: String, default: '' },
	timestamp: { type: Date, default: Date.now },
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = { Feedback };
