const { Pizza, Comment } = require("../models");
const commentController = {
	addComment({ body, params }, res) {
		//get id as pizza id from user
		Comment.create(body)
			.then(({ _id }) => {
				return Pizza.findOneAndUpdate(
					{ _id: params.pizzaId },
					{ $push: { comments: _id } },
					{ new: true }
				);
			})
			.then((dbPizzaData) => {
				if (!dbPizzaData) {
					res.status(404).json({ message: "No Pizza found with this id" });
					return;
				}
				res.json(dbPizzaData);
			})
			.catch((err) => res.json(err));
	},

	removeComment({ params }, res) {
		//get id as comment id from user
		Comment.findOneAndDelete({ _id: params.commentId })
			.then((dbResultData) => {
				if (!dbResultData) {
					res.status(404).json("message", "required id not found!");
					return;
				}
				return Pizza.findOneAndUpdate(
					{ _id: params.pizzaId },
					{ $pull: { comments: params.commentId } },
					{ new: true }
				)
					.then((dbResultData) => {
						if (!dbResultData) {
							res.status(404).json({ message: "No pizza found with this id!" });
							return;
						}
						res.json(dbResultData);
					})
					.catch((err) => res.json(err));
			})
			.catch((err) => res.json(err));
	},
};

module.exports = commentController;
