const dotenv = require("dotenv");

dotenv.config();

// db config

const { db } = require("../Database/Database");

// Getting all the Products
module.exports.getAllProducts = (req, res) => {
	const gettingAllProductQuery = `select productId,productName,productImage,productDescription,porductAvilability,catagory,price,createdAt,updatedAt from products `;
	db.query(gettingAllProductQuery, (error, result) => {
		if (error) {
			console.log(error);
			res.status(400).send({ message: "Error" });
		} else {
			res.status(200).send({ message: "success", result });
		}
	});
};

// Get all the product that were created by the retailer
module.exports.getProductsByUserId = (req, res) => {
	const userIdFromParams = req.params.userId;
	// we changed the string type to number type
	const ids = Number(userIdFromParams);
	const { id, userType } = req;
	if (id === ids && userType === "retailer") {
		const geProductsListBasedOnUserId = `select productId,productName,productImage,productDescription,porductAvilability,catagory,price,createdAt,updatedAt from products where userId = ?`;
		db.query(geProductsListBasedOnUserId, id, (error, result) => {
			if (error) {
				console.log(error);
				res.status(400).send({ message: "Error" });
			} else {
				res.status(200).send({ message: "Success", result });
			}
		});
	} else {
		res.status(400).send({ message: "Error" });
	}
};

// Get one product info
module.exports.getProductsByProductId = (req, res) => {
	const productId = req.params.productId;
	const getOneProductInfo = `select productId,productName,productImage,productDescription,porductAvilability,catagory,price,createdAt,updatedAt from products where productId = ?`;
	db.query(getOneProductInfo, productId, (error, result) => {
		if (error) {
			console.log(error);
			res.status(400).send({ message: "Error" });
		} else if (result.length === 1) {
			res.status(200).send({ message: "Success", result: result[0] });
		} else {
			res.status(400).send({ message: "Error" });
		}
	});
};

// Getting Products By category

module.exports.getProductByCategory = (req, res) => {
	const category = req.params.category;
	if (category.length < 3) {
		res.status(400).send({ message: "Error" });
	} else {
		const gettingAllProductByCategory = `select productId,productName,productImage,productDescription,porductAvilability,catagory,price,createdAt,updatedAt from products where catagory = ? `;
		db.query(gettingAllProductByCategory, category, (error, result) => {
			if (error) {
				console.log(error);
				res.status(400).send({ message: "Error" });
			} else {
				res.status(200).send({ message: "success", result });
			}
		});
	}
};

// Creating Products
module.exports.createProduct = (req, res) => {
	const { id, userType } = req;
	const {
		userId,
		productName,
		productImage,
		productDescription,
		porductAvilability,
		catagory,
		price,
	} = req.body;
	if (userId === id && userType === "retailer") {
		if (!userId || !price || productName.length < 3) {
			console.log("Error");
			res.status(400).send({ message: "Error" });
		} else {
			const productCreation = `insert into products(
				userId,
				productName,
				productImage,
				productDescription,
				porductAvilability,
				catagory,
				price
				) values(?,?,?,?,?,?,?)`;
			db.query(
				productCreation,
				[
					userId,
					productName,
					productImage,
					productDescription,
					porductAvilability,
					catagory,
					price,
				],
				(error, result) => {
					if (error) {
						console.log(error);
						res.status(400).send({ message: "Error" });
					} else {
						res.status(201).send({ message: "ProductCreated" });
					}
				}
			);
		}
	} else {
		console.log("Error");
		res.status(400).send({ message: "Error" });
	}
};

// UpdateProduct
module.exports.upDateOneProduct = (req, res) => {
	const { userId, productId, productDescription, porductAvilability, price } =
		req.body;
	const { id, userType } = req;
	if (id === userId && userType === "retailer") {
		if (!price || !porductAvilability) {
			console.log("Error");
			res.status(400).send({ message: "Error" });
		} else {
			const updatingProductQuery = `update products set productDescription = ?, porductAvilability = ? ,price = ? where productId = ?`;
			db.query(
				updatingProductQuery,
				[productDescription, porductAvilability, price, productId],
				(error, result) => {
					if (error) {
						console.log(error);
						res.status(400).send({ message: "Error" });
					} else {
						res.status(201).send({ message: "ProductUpdated" });
					}
				}
			);
		}
	} else {
		res.status(400).send({ message: "Error" });
	}
};

// Deleting one product
module.exports.deleteOneProduct = (req, res) => {
	const { id, userType } = req;
	const { userId, productId } = req.body;
	if (id === userId && userType === "retailer") {
		const deleteOneProductQuery = `delete from products where productId = ? `;
		db.query(deleteOneProductQuery, productId, (error, result) => {
			if (error) {
				console.log(error);
				res.status(400).send({ message: "Error" });
			} else {
				res.status(201).send({ message: "ProductDeleted" });
			}
		});
	}
};
