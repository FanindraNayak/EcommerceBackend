const express = require("express");
const router = express.Router();

// importing functions
const {
	getAllUsers,
	registerUser,
	loginUser,
} = require("../Controllers/userControllers");

// Routes
router.get("/", getAllUsers);
router.post("/register", registerUser);

router.post("/login", loginUser);
module.exports = router;
