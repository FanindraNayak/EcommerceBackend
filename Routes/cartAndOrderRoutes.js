const express = require("express");
const router = express.Router();

const { checkToken } = require("../Middlewares/Middlewares");

const {
	getAllThingsInCart,
	addItemToCart,
	updateAnItemInCart,
	deleteAnItemInCart,
} = require("../Controllers/cartAndOrderController");

router.get("/allThingsInCart", checkToken, getAllThingsInCart);

router.post("/addItemToCart", checkToken, addItemToCart);

router.put("/updateAnItemInCart", checkToken, updateAnItemInCart);

router.delete("/deleteAnItemInCart", checkToken, deleteAnItemInCart);

module.exports = router;
