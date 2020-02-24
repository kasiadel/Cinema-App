var jwtSecret = "your_jwt_secret"; //this has to be the same key used in the JWTStrategy
var jwt = require("jsonwebtoken");
const passport = require("passport");
require("./passport"); //your local passport file

function generateJWTToken(user) {
	return jwt.sign(user, jwtSecret, {
		subject: user.Username, //This is the username you're encoding in the JWT
		expiresIn: "7d", //this specifies that the token will expire in 7 days
		algorithm: "HS256" //this is the algorithm used to "sign" or encode the vallues of the JWT
	});
}

/* POST login. */
module.exports = router => {
	router.post("/login", (req, res) => {
		passport.authenticate("local", { session: false }, (error, user, info) => {
			if (error || !user) {
				return res.status(400).json({
					message: "Something is not right",
					user: user
				});
			}
			req.login(user, { session: false }, error => {
				if (error) {
					res.send(error);
				}
				var token = generateJWTToken(user.toJSON());
				return res.json({ user, token });
			});
		})(req, res);
	});
};
