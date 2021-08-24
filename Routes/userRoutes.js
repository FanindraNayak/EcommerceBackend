const express = require("express");
const router = express.Router();
const { checkToken } = require("../Middlewares/Middlewares");
// importing functions
const {
	getAllUsers,
	registerUser,
	loginUser,
} = require("../Controllers/userControllers");

// Routes
router.get("/", checkToken, getAllUsers);
router.post("/register", registerUser);

router.post("/login", loginUser);
module.exports = router;
