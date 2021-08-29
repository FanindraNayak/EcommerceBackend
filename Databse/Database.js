const mysql = require("mysql");

// Conneting to db.
const dotenv = require("dotenv");

dotenv.config();
db = mysql.createPool({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
});

mysql.createConnection;

module.exports.getUsersQuery = (querys) => {
	db.query(querys, (error, result) => {
		console.log(error);
		console.log(result);
		res.status(200).send("Hi this is home");
	});
};







