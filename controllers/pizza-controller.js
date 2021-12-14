const { Pizza } = require("../models");
const pizzacontroller = {
	//GET ALL PIZZA
	getAllPizza(req, res) {
		Pizza.find({})
			.then((dbPizzaData) => {
				res.json(dbPizzaData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	//GET ONE PIZZA
	getPizzaById({ params }, res) {
		Pizza.findOne({
			_id: params.id,
		})
			.then((dbPizzaData) => {
				if (!dbPizzaData) {
					res.json(404).json({ message: "No pizza found with this id" });
					return;
				}
				res.json(dbPizzaData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	//CREATE NEW PIZZA
	createPizza({ body }, res) {
		console.log("Creating new pizza");
		Pizza.create(body)
			.then((dbResultData) => {
				res.json(dbResultData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	//UPDATE PIZZA BY ID
	updatePizza({ params, body }, res) {
		Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
			.then((dbResultData) => {
				if (!dbResultData) {
					res.status(404).json({ message: "no pizza found with this id!!" });
					return;
				}
				res.json(dbResultData);
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	},
	deletePizza({ params }, res) {
		Pizza.findOneAndDelete({ _id: params.id })
			.then((dbResultData) => {
				if (!dbResultData) {
					res.status(404).json({ message: "No pizza found with this id!" });
					return;
				}
				res.json(dbResultData);
			})
			.catch((err) => res.status(400).json(err));
	},
};
module.exports = pizzacontroller;
