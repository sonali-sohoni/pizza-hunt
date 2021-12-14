const router = require("express").Router();
//Import  controller meethods
const {
	getAllPizza,
	getPizzaById,
	createPizza,
	updatePizza,
	deletePizza,
} = require("../../controllers/pizza-controller");
//SET UP GET ALL AND POST at /api/pizzas/

router.route("/").get(getAllPizza).post(createPizza);
router.route("/:id").get(getPizzaById).put(updatePizza).delete(deletePizza);
module.exports = router;
