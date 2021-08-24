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

mysql.createConnection;
// const { getUsersQuery } = require("../Databse/Database");
module.exports.getAllUsers = (req, res) => {
	const getUsersQuery = `select * from users`;
	db.query(getUsersQuery, (error, result) => {
		if (error) console.log(error);
		else {
			res.status(200).send(result);
		}
	});
};

module.exports.registerUser = (req, res) => {
	res.send("user Registered");
};

module.exports.loginUser = (req, res) => {
	res.send("User logged in");
};
