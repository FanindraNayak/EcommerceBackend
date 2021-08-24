const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// GettingDatabase

const db = require("../Databse/Database");

module.exports.getAllProducts = (req, res) => {
	res.send("got all products");
};

module.exports.getProductsByUserId = (req, res) => {
	res.send("got product based on userId");
};

module.exports.getProductsByProductId = (req, res) => {
	res.send("Got one product");
};
