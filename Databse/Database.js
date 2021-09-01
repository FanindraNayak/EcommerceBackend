const mysql = require("mysql");

// Conneting to db.
const dotenv = require("dotenv");

dotenv.config();
// db = mysql.createPool({
// 	host: process.env.HOST,
// 	user: process.env.USER,
// 	password: process.env.PASSWORD,
// 	database: process.env.DATABASE,
// });

mysql.createConnection;

module.exports.db = mysql.createPool({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
});
