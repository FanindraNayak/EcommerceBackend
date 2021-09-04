const express = require("express");
const router = express.Router();

const { checkToken } = require("../Middlewares/Middlewares");

const {
	getAllThingsInCart,
	addItemToCart,
	updateAnItemInCart,
	deleteAnItemInCart,
	allOrderedItems,
	placeAnOrder,
	deleteAnOrder,
} = require("../Controllers/cartAndOrderController");

// Cart Routes

router.get("/allThingsInCart", checkToken, getAllThingsInCart);

router.post("/addItemToCart", checkToken, addItemToCart);

router.put("/updateAnItemInCart", checkToken, updateAnItemInCart);

router.delete("/deleteAnItemInCart", checkToken, deleteAnItemInCart);

// Orders Route

router.get("/allOrderedItems", checkToken, allOrderedItems);

router.post("/placeAnOrder", checkToken, placeAnOrder);

router.delete("/deleteAnOrder", checkToken, deleteAnOrder);

module.exports = router;
