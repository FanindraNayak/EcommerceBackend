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
	editUserDetails,
	deleteSingleUser,
} = require("../Controllers/userControllers");

// Routes
router.get("/getAllUsers", checkToken, getAllUsers);

router.get("/loggedInOrNotCheck", checkToken, userLoggedInOrNot);

router.get("/user/:id", checkToken, getOneUser);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.put("/editUserDetails", checkToken, editUserDetails);

router.delete("/deleteSingleUser", checkToken, deleteSingleUser);

module.exports = router;
