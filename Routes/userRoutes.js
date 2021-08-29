const express = require("express");
const router = express.Router();
const { checkToken } = require("../Middlewares/Middlewares");
// importing functions
const {
	getAllUsers,
	registerUser,
	loginUser,
	userLoggedInOrNot,
	getOneUser,
} = require("../Controllers/userControllers");

// Routes
router.get("/getAllUsers", checkToken, getAllUsers);

router.get("/loggedInOrNotCheck", checkToken, userLoggedInOrNot);

router.get("/user/:id", checkToken, getOneUser);

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;
