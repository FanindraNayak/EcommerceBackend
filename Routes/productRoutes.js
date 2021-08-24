const express = require("express");
const router = express.Router();
// get productControllers

const {
	getAllProducts,
	getProductsByUserId,
	getProductsByProductId,
} = require("../Controllers/productController");
router.get("/products/", getAllProducts);

router.get("/product/:userId", getProductsByUserId);

router.get("/product/:productId", getProductsByProductId);

module.exports = router;
