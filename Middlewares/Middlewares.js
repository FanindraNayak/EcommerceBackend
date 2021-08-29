const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
	// We verify the user exist by jwt token
	let token = req.cookies.userEmail;
	if (token) {
		jwt.verify(token, "SecretePassword", (error, decoded) => {
			if (error) {
				console.log(error);
				res.status(401).send({ message: "Invalid Token" });
			} else {
				// sending data to the route using req method and variable name you want
				req.emails = decoded.userEmail;
				req.id = decoded.userId;
				// console.log(req.emails, req.id);
				// console.log("Success");
				next();
			}
		});
	} else {
		res.status(401).send({ message: "Access Denied" });
	}
};

module.exports = { checkToken };
