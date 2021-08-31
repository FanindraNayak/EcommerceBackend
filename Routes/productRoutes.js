const express = require("express");
const router = express.Router();

const { checkToken } = require("../Middlewares/Middlewares");
// get productControllers

const {
	getAllProducts,
	getProductsByUserId,
	getProductsByProductId,
	createProduct,
	getProductByCategory,
	upDateOneProduct,
	deleteOneProduct
} = require("../Controllers/productController");
router.get("/", getAllProducts);

router.get("/product/byUser/:userId", checkToken, getProductsByUserId);

router.get("/product/byProduct/:productId", getProductsByProductId);

router.get("/product/byCategory/:category", getProductByCategory);

router.post("/postProduct/", checkToken, createProduct);

router.put("/upDateOneProduct",checkToken,upDateOneProduct)

router.delete("/deleteOneProduct",checkToken,deleteOneProduct)

module.exports = router;
