const { Schema, model } = require("mongoose");

const CommentSchema = new Schema({
	writtenBy: {
		type: String,
	},
	commentBody: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Comment = new model("Comment", CommentSchema);
module.exports = Comment;
