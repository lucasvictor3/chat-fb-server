const mongoose = require('../db');

const NewsSchema = new mongoose.Schema({
	newsId: {
		type: Number,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	image_url: {
		type: String,
		required: true,
	},
	sub_title: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	theme: {
		type: String,
		required: true,
	},
	
	})

const News = mongoose.model('News', NewsSchema);

module.exports = News;
