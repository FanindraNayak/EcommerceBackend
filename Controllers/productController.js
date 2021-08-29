const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
// db
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createPool({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
});

// GettingDatabase

// const db = require("../Databse/Database");

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
	// res.send("got all products");
};

// Get all the product that were created by the retailer
module.exports.getProductsByUserId = (req, res) => {
	const userIdFromParams = req.params.userId;
	const userIdFromCookies = req.id;
	if (userIdFromCookies != userIdFromParams) {
		console.log("userId and cookies userId do not match");
		res.status(400).send({ message: "Error" });
	} else {
		const geProductsListBasedOnUserId = `select productId,productName,productImage,productDescription,porductAvilability,catagory,price,createdAt,updatedAt from products where userId = ?`;
		db.query(
			geProductsListBasedOnUserId,
			userIdFromCookies,
			(error, result) => {
				if (error) {
					console.log(error);
					res.status(400).send({ message: "Error" });
				} else {
					res.status(200).send({ message: "Success", result });
				}
			}
		);
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
