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

// getting in All the user function
module.exports.getAllUsers = (req, res) => {
	const getUsersQuery = `select userId,userName,userEmail,userAcess,createdAt from users`;
	db.query(getUsersQuery, (error, result) => {
		if (error) console.log(error);
		else {
			res.status(200).send(result);
		}
	});
};

// Registering User function
module.exports.registerUser = async (req, res) => {
	const { userName, userEmail, password, confirmPassword, userAcess } =
		req.body;
	if (!userName || !userEmail || !password || !confirmPassword || !userAcess) {
		res.send("Fill All Entry");
	} else if (password !== confirmPassword) {
		res.send("Please Make sure the password is equal to confirm password");
	} else if (password.length < 6 || confirmPassword.length < 6) {
		res.send("make sure password is of more then 6 charaters");
	} else {
		let hashedPassword = await bcrypt.hash(password, 10);
		let hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);
		const creatingUserQuery = `insert into users(userName,userEmail,password,confirmPassword,userAcess) values(?,?,?,?,?)`;
		db.query(
			creatingUserQuery,
			[userName, userEmail, hashedPassword, hashedConfirmPassword, userAcess],
			(error, result) => {
				if (error) {
					console.log(error);
					res.send("error");
				} else {
					console.log("user Created");
					res.send("user Registered");
				}
			}
		);
	}
};

// Logging in user function
module.exports.loginUser = (req, res) => {
	const { email, password } = req.body;
	if (!email || !password || password.length < 6) {
		res.send("Check All the entry");
	} else {
		const loginQuery = `select userId,userName,userEmail,userEmail,password,userAcess,createdAt from users where userEmail = ?`;
		db.query(loginQuery, email, async (error, result) => {
			if (error) {
				console.log(error);
				res.send("Error");
			} else if (result.length === 0) {
				res.send("No SuchUserExist");
			} else {
				const passwordFromDb = result[0].password;
				const userIdFromDb = result[0].userId;
				const compare = await bcrypt.compare(password, passwordFromDb);
				if (compare === true) {
					// console.log(result);
					// creating jwt token
					const jasonToken = jwt.sign(
						{
							userId: userIdFromDb,
							userEmail: email,
						},
						"SecretePassword",
						{
							expiresIn: "5hr",
						}
					);
					// setting jwt in cokies
					res.cookie("userEmail", jasonToken, {
						maxAge: 2 * 60 * 60 * 1000,
						httpOnly: true,
						secure: false,
					});
					res.send("logged in");
				}
			}
		});
	}
};
