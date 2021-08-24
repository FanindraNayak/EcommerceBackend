const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
	// We verify the user exist by jwt token
	let token = req.cookies.userEmail;
	if (token) {
		jwt.verify(token, "SecretePassword", (error, decoded) => {
			if (error) {
				console.log(error);
				res.send("Invalid Token");
			} else {
				// sending data to the route using req method and variable name you want
				req.emails = decoded.userEmail;
				req.id = decoded.userId;
				console.log(req.emails, req.id);
				console.log("Sucess");
				next();
			}
		});
	} else {
		res.send("acess Denied");
	}
};

module.exports = { checkToken };
