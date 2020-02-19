var express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;
const app = express();
uuid = require("uuid");
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/Cinema-App',
	{ useNewUrlParser: true, useUnifiedTopology: true });


// Get all users
app.get('/users', function (req, res) {

	Users.find()
		.then(function (users) {
			res.status(201).json(users)
		})
		.catch(function (err) {
			console.error(err);
			res.status(500).send("Error: " + err);
		});
});


//Create new User
app.post('/users', function (req, res) {
	Users.findOne({ Username: req.body.Username })
		.then(function (user) {
			if (user) {
				return res.status(400).send(req.body.Username + "already exists");
			} else {
				Users
					.create({
						Username: req.body.Username,
						Password: req.body.Password,
						Email: req.body.Email,
						Birthday: req.body.Birthday
					})
					.then(function (user) { res.status(201).json(user) })
					.catch(function (error) {
						console.error(error);
						res.status(500).send("Error: " + error);
					})
			}
		}).catch(function (error) {
			console.error(error);
			res.status(500).send("Error: " + error);
		});
});

// Get a user by username
app.get('/users/:Username', function (req, res) {
	Users.findOne({ Username: req.params.Username })
		.then(function (user) {
			res.json(user)
		})
		.catch(function (err) {
			console.error(err);
			res.status(500).send("Error: " + err);
		});
});



// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put('/users/:Username', function (req, res) {
	Users.findOneAndUpdate({ Username: req.params.Username }, {
		$set:
		{
			Username: req.body.Username,
			Password: req.body.Password,
			Email: req.body.Email,
			Birthday: req.body.Birthday
		}
	},
		{ new: true }, // This line makes sure that the updated document is returned
		function (err, updatedUser) {
			if (err) {
				console.error(err);
				res.status(500).send("Error: " + err);
			} else {
				res.json(updatedUser)
			}
		})
});


// Delete a user by username
app.delete('/users/:Username', function (req, res) {
	Users.findOneAndRemove({ Username: req.params.Username })
		.then(function (user) {
			if (!user) {
				res.status(400).send(req.params.Username + " was not found");
			} else {
				res.status(200).send(req.params.Username + " was deleted.");
			}
		})
		.catch(function (err) {
			console.error(err);
			res.status(500).send("Error: " + err);
		});
});





// Get all movies
app.get('/movies', function (req, res) {

	Movies.find()
		.then(function (movies) {
			res.status(201).json(movies)
		})
		.catch(function (err) {
			console.error(err);
			res.status(500).send("Error: " + err);
		});
});

// Get a movie by title
app.get('/movies/:Title', function (req, res) {
	Movies.findOne({ Title: req.params.Title })
		.then(function (movie) {
			res.json(movie)
		})
		.catch(function (err) {
			console.error(err);
			res.status(500).send("Error: " + err);
		});
});

//Get a director by name
app.get('/movies/director/:Name', function (req, res) {

	Movies.findOne({ "Director.Name": req.params.Name })
		.then(function (movies) {
			res.status(201).json(movies.Director)   /*Returns Director By Name*/
		})
		.catch(function (error) {
			console.error(error);
			res.status(500).send("Error" + err);
		});
});

// Get a data about genre by movie title
app.get('/movies/genres/:Title', function (req, res) {

	Movies.findOne({ Title: req.params.Title })
		.then(function (movie) {
			res.status(201).send(movie.Genre.Name + ' : ' + movie.Genre.Description)   /*Returns Genre Info By Movie Title*/
		})
		.catch(function (error) {
			console.error(error);
			res.status(500).send("Error" + error);
		});
});

// Add a movie to a user's list of favorites

app.post('/users/:Username/movies/:MovieID', function (req, res) {  /*Allows User To Add A New Favorite Movie*/
	Users.findOneAndUpdate({ Username: req.params.Username }, {
		$push: { FavoriteMovies: req.params.MovieID }
	},
		{ new: true },
		function (error, updatedUser) {
			if (error) {
				console.error(error);
				res.status(500).send("Error: " + error);
			} else {
				res.json(updatedUser)
			}
		})
});


//Delete movie from FavoriteMovies list
app.delete('/users/:Username/movies/:MovieID', function (req, res) {  /*Allows User To Delete A Favorite Movie*/
	Users.findOneAndUpdate({ Username: req.params.Username }, {
		$pull: { FavoriteMovies: req.params.MovieID }
	},
		{ new: true },
		function (error, updatedUser) {
			if (error) {
				console.error(error);
				res.status(500).send("Error: " + error);
			} else {
				res.status(201).send("Movie Under ID # " + req.params.MovieID + " Has Been Deleted From Member's Account.");
			}
		})
});
//use express.static
//to serve  “documentation.html” file from the public folder
app.use(express.static("public"));
app.use(bodyParser.json());

//use the Morgan middleware library to log all requests
morgan = require("morgan");
app.use(morgan("common"));

app.get("/secreturl", function (req, res) {
	res.send("This is a secret url with super top-secret content.");
});

//creating error-handling middleware
//function that will log all application-level errors to the terminal

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

// listen for requests
app.listen(8080, () => console.log("Your app is listening on port 8080."));
