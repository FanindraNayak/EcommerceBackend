const express = require("express");
const router = express.Router();

const { checkToken } = require("../Middlewares/Middlewares");

const {
	getAllThingsInCart,
	addItemToCart,
	updateAnItemInCart,
	deleteAnItemInCart,
	allOrderedItems,
} = require("../Controllers/cartAndOrderController");

// Cart Routes

router.get("/allThingsInCart", checkToken, getAllThingsInCart);

router.post("/addItemToCart", checkToken, addItemToCart);

router.put("/updateAnItemInCart", checkToken, updateAnItemInCart);

router.delete("/deleteAnItemInCart", checkToken, deleteAnItemInCart);

// Orders Route

router.get("/allOrderedItems", checkToken, allOrderedItems);
module.exports = router;
