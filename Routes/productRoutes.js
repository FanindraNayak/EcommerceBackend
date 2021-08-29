const express = require("express");
const router = express.Router();

const { checkToken } = require("../Middlewares/Middlewares");
// get productControllers

const {
	getAllProducts,
	getProductsByUserId,
	getProductsByProductId,
} = require("../Controllers/productController");
router.get("/", getAllProducts);

router.get("/product/byUser/:userId", checkToken, getProductsByUserId);

router.get("/product/byProduct/:productId", getProductsByProductId);

module.exports = router;
