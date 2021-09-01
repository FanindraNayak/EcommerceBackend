const dotenv = require("dotenv");

dotenv.config();

// db config
const { db } = require("../Databse/Database");

module.exports.getAllThingsInCart = (req, res) => {
	const { id, userType } = req;
	if (userType === "normal") {
		const getALlThingsOnCartOfUser = `select * from cart where userId = ?`;
		db.query(getALlThingsOnCartOfUser, id, (error, result) => {
			if (error) {
				console.log(error);
				res.status(400).send({ message: "Error" });
			}
			res.status(200).send({ message: "gotAllThingsInCart", result });
		});
	} else {
		res.status(400).send({ message: "Error" });
	}
};

// Adding to cart
module.exports.addItemToCart = (req, res) => {
	const { id, userType } = req;
	const { userId, productId, noOfItemsOfSameProduct, totalPrice } = req.body;
	if (id != userId) {
		res.status(400).send({ message: "Error" });
	} else if (!userId || !productId || !noOfItemsOfSameProduct || !totalPrice) {
		res.status(400).send({ message: "Error Happened" });
	} else if (userType === "normal") {
		const addingToCartQuery = `insert into cart(userId, productId, noOfItemsOfSameProduct, totalPrice) values(?,?,?,?)`;
		db.query(
			addingToCartQuery,
			[userId, productId, noOfItemsOfSameProduct, totalPrice],
			(error, result) => {
				if (error) {
					console.log(error);
					res
						.status(400)
						.send({ message: "Error check if item is already in cart or not" });
				} else {
					res.status(200).send({ message: "GotAdded" });
				}
			}
		);
	} else {
		res.status(400).send({ message: "Error Happened" });
	}
};

// Update cart Item
module.exports.updateAnItemInCart = (req, res) => {
	const { id, userType } = req;
	const { userId, productId, noOfItemsOfSameProduct, totalPrice } = req.body;
	if (id != userId) {
		res.status(400).send({ message: "Error" });
	} else if (!userId || !productId || !noOfItemsOfSameProduct || !totalPrice) {
		res.status(400).send({ message: "Error Happened" });
	} else if (userType === "normal") {
		const updatingCartItemQuery = `update cart set noOfItemsOfSameProduct=?, totalPrice=? where productId=?`;
		db.query(
			updatingCartItemQuery,
			[noOfItemsOfSameProduct, totalPrice, productId],
			(error, result) => {
				if (error) {
					console.log(error);
					res
						.status(400)
						.send({ message: "Error check if item is already in cart or not" });
				} else {
					res.status(200).send({ message: "GotUpdated" });
				}
			}
		);
	} else {
		res.status(400).send({ message: "Error Happened" });
	}
};

// Delete an item in cart

module.exports.deleteAnItemInCart = (req, res) => {
	const { id, userType } = req;
	const { userId, productId } = req.body;
	if (id != userId || !productId) {
		res.status(400).send({ message: "Error" });
	} else if (userType === "normal") {
		const deleteAnItemInCartQuery = `delete from cart where productId = ?`;
		db.query(deleteAnItemInCartQuery, productId, (error, result) => {
			if (error) {
				console.log(error);
				res.status(400).send({ message: "Error " });
			} else {
				res.status(200).send({ message: "GotDeleted" });
			}
		});
	} else {
		res.status(400).send({ message: "Error Happened" });
	}
};

// Ordering Items i.e placing an order
module.exports.allOrderedItems = (req, res) => {
	const { id, userType } = req;
	if (userType === "normal") {
		const getAllOrderItemsQuery = `select * from orders where userId=?`;
		db.query(getAllOrderItemsQuery, id, (error, result) => {
			if (error) {
				console.log(error);
				res.status(400).send({ message: "Error " });
			} else {
				console.log(result);
				res.status(200).send({ message: "GotDeleted" });
			}
		});
	} else {
		res.status(400).send({ message: "Error Happened" });
	}
};
