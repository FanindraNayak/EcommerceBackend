const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const mysql = require("mysql");
// db
const dotenv = require("dotenv");

dotenv.config();

// const db = mysql.createPool({
// 	host: process.env.HOST,
// 	user: process.env.USER,
// 	password: process.env.PASSWORD,
// 	database: process.env.DATABASE,
// });

// Db
const { db } = require("../Databse/Database");
// const db = sar.db;
// mysql.createConnection;

// getting in All the user function
module.exports.getAllUsers = (req, res) => {
	const getUsersQuery = `select userId,userName,userEmail,userAcess,createdAt from users`;
	db.query(getUsersQuery, (error, result) => {
		if (error) {
			console.log(error);
			res.status(400).send({ message: "Error" });
		} else {
			res.status(200).send(result);
		}
	});
};

// Checking if the user is loggedInOrNOt

module.exports.userLoggedInOrNot = async (req, res) => {
	// we get email and id of the user from the cookies
	const { emails, id, userType } = req;
	res.status(200).send({
		message: "LoggedIn",
		emails: emails,
		Id: id,
		userType: userType,
	});
};

// Get the single User info

module.exports.getOneUser = (req, res) => {
	const userIdFromParams = req.params.id;
	const userIdFromCookies = req.id;
	if (userIdFromCookies != userIdFromParams) {
		console.log("userId and cookies userId do not match");
		res.status(400).send({ message: "Error" });
	} else {
		const getUserInfoQuery = `select userId,userName,userEmail,userAcess,createdAt,updatedAt from users where userId=?`;
		db.query(getUserInfoQuery, userIdFromCookies, (error, result) => {
			if (error) {
				console.log(error);
			}
			// Checking if the user data we got from the database has only one data
			else if (result.length === 1) {
				res.status(200).send({ message: "GotUser", result });
			} else {
				res.status(500).send({ message: "Sorry error" });
			}
		});
	}
};

// Registering User function
module.exports.registerUser = async (req, res) => {
	const { userName, userEmail, password, confirmPassword, userAcess } =
		req.body;
	// We check if all required fields are filled or not
	if (!userName || !userEmail || !password || !confirmPassword || !userAcess) {
		res.status(400).send({ message: "Fill All Entry" });
	}
	// We check password length as well as password === confirmPassword
	else if (password !== confirmPassword) {
		res.status(400).send({
			message: "Please Make sure the password is equal to confirm password",
		});
	} else if (password.length < 6 || confirmPassword.length < 6) {
		res
			.status(400)
			.send({ message: "Make sure password is of more then 6 Charters" });
	}
	// If all fields are correct we continue
	else {
		// we hash the password as well as confirm password
		let hashedPassword = await bcrypt.hash(password, 10);
		let hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);
		const creatingUserQuery = `insert into users(userName,userEmail,password,confirmPassword,userAcess) values(?,?,?,?,?)`;
		db.query(
			creatingUserQuery,
			[userName, userEmail, hashedPassword, hashedConfirmPassword, userAcess],
			(error, result) => {
				if (error) {
					console.log(error);
					res.status(400).send({ message: "error" });
				} else {
					console.log("user Created");
					res.status(201).send({ message: "user Registered" });
				}
			}
		);
	}
};

// Logging in user function
module.exports.loginUser = (req, res) => {
	const { email, password } = req.body;
	// Checking if user has filled email or password or if password length is less then 6 if any of this is true we tell to check all entry
	if (!email || !password || password.length < 6) {
		res.status(400).send({ message: "Check All the entry" });
	}
	// If all the criteria of email password and password length is up to mark then we continue
	else {
		// Query string
		const loginQuery = `select userId,userName,userEmail,userEmail,password,userAcess,createdAt from users where userEmail = ?`;
		db.query(loginQuery, email, async (error, result) => {
			if (error) {
				console.log(error);
				res.status(400).send({ message: "Error" });
			} else if (result.length === 0) {
				res.status(404).send({ message: "No SuchUserExist" });
			} else {
				// We get result array with 1 object in it if user is there
				// We take userId and the hassed password from db
				const passwordFromDb = result[0].password;
				const userIdFromDb = result[0].userId;
				const userAcess = result[0].userAcess;
				// We use the given method in bcrypt the compare method to check if password is right or not
				const compare = await bcrypt.compare(password, passwordFromDb);
				if (compare === true) {
					// creating jwt token
					const jasonToken = jwt.sign(
						{
							// Passing two field to the token
							userId: userIdFromDb,
							userEmail: email,
							userType: userAcess,
						},

						"SecretePassword",
						{
							expiresIn: "5hr",
						}
					);
					// setting jwt in cookies in browser
					res.cookie("userEmail", jasonToken, {
						maxAge: 2 * 60 * 60 * 1000,
						httpOnly: true,
						secure: false,
					});
					res.status(200).send({ message: "logged in" });
				}
			}
		});
	}
};

// Editing single User info

module.exports.editUserDetails = (req, res) => {
	const { id } = req;
	const { userId, userName } = req.body;
	if (id === userId && userName) {
		const updateUserNameQuery = `update users set userName=? where userId=?`;
		db.query(updateUserNameQuery, [userName, id], (error, result) => {
			if (error) {
				console.log(error);
				res.status(400).send({ message: "error" });
			} else {
				console.log("user Updated");
				res.status(201).send({ message: "user Updated" });
			}
		});
	}
};

// Deleting a user

module.exports.deleteSingleUser = (req, res) => {
	const { id } = req;
	const { userId } = req.body;
	if (id === userId) {
		const deleteUser = `delete from users where userId = ?`;
		db.query(deleteUser, id, (error, result) => {
			if (error) {
				console.log(error);
				res.status(400).send({ message: "error" });
			} else {
				res.status(201).send({ message: "user Deleted" });
			}
		});
	}
};
