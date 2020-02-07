var express = require("express");
var bodyParser = require("body-parser");
var app = express();
uuid = require("uuid");
app.use(bodyParser.json());

let Movies = [
	{
		title: "Out of Africa",
		director: "Sydney Pollack",
		year: "1985",
		description: "In 20th-century colonial Kenya, a Danish baroness/plantation owner has a passionate love affair with a free-spirited big-game hunter.",
		genre: ["Drama", "Biography", "Romance"],
		leadingMan: "Robert Redford",
		leadingFemale: "Meryl Streep"
	},
	{
		title: "The Sting",
		director: "George Roy Hill",
		year: "1973",
		description: "Two grifters team up to pull off the ultimate con.",
		genre: ["Comedy", "Crime"],
		leadingMan: ["Robert Redford", "Paul Newman"],
		leadingFemale: "Eileen Brennan"
	},
	{
		title: "Candidate",
		director: "Michael Ritchie",
		year: "1972",
		description: "Bill McKay is a candidate for the U.S. Senate from California. He has no hope of winning, so he is willing to tweak the establishment.",
		genre: ["Comedy", "Drama"],
		leadingMan: "Robert Redford",
		leadingFemale: "Karen Carlson"
	},
	{
		title: "Quiz Show",
		director: "Robert Redford",
		year: "1994",
		description: "A young lawyer, Richard Goodwin, investigates a potentially fixed game show. Charles Van Doren, a big time show winner, is under Goodwin's investigation.",
		genre: ["Biography", "Drama"],
		leadingMan: ["Ralph Fiennes", "John Torturro"],
		leadingFemale: "Elizabeth Wilson"
	},

	{
		title: "The Old Man & the Gun",
		director: "David Lowery",
		year: "2018",
		description: "Based on the true story of Forrest Tucker and his audacious escape from San Quentin at the age of 70 to an unprecedented string of heists that confounded authorities and enchanted the public.",
		genre: ["Drama", "Biography", "Comedy"],
		leadingMan: "Robert Redford",
		leadingFemale: "Sissy Spacek"
	},
	{
		title: "A River Runs Through It",
		director: "Robert Redford",
		year: "1992",
		description: "The story about two sons of a stern minister -- one reserved, one rebellious -- growing up in rural Montana while devoted to fly fishing.",
		genre: "Drama",
		leadingMan: ["Brad Pitt", "Craig Sheffer"],
		leadingFemale: "Brenda Blethyn"
	},

	{
		title: "Indecent Proposal",
		director: "Adrian Lyne",
		year: "1993",
		description: "A billionaire offers one million dollars to a young married couple for one night with the wife.",
		genre: ["Drama", "Romance"],
		leadingMan: "Robert Redford",
		leadingFemale: "Demi Moore"
	},
	{
		title: "Our Souls at Night ",
		director: "Ritesh Batra",
		year: "2017",
		description: "Fonda and Redford star as Addie Moore and Louis Waters, a widow and widower who've lived next to each other for years. The pair have almost no relationship, but that all changes when Addie tries to make a connection with her neighbor.",
		genre: ["Drama", "Romance"],
		leadingMan: "Robert Redford",
		leadingFemale: "Jane Fonda"
	},
	{
		title: "The Horse Whisperer",
		director: "Robert Redford",
		year: "1998",
		description: "The mother of a severely traumatized daughter enlists the aid of a unique horse trainer to help the girl's equally injured horse.",
		genre: ["Drama", "Romance", "Western"],
		leadingMan: "Robert Redford",
		leadingFemale: "Kristin Scott Thomas"
	},

	{
		title: "The Way We Were",
		director: "Sydney Pollack",
		year: "1997",
		description: "Two disparate people have a wonderful romance, but their political views and convictions drive them apart.",
		genre: ["Drama", "Romance", "Western"],
		leadingMan: "Robert Redford",
		leadingFemale: "Kristin Scott Thomas"
	},
];


let Genres = [
	{
		name: "Drama",
		description: "Drama film is a genre that relies on the emotional and relational development of realistic characters. While Drama film relies heavily on this kind of development, dramatic themes play a large role in the plot as well. Often, these dramatic themes are taken from intense, real life issues",
	},
	{
		name: "Comedy",
		description: "A comedy film is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.[1] Films in this style traditionally have a happy ending (black comedy being an exception). One of the oldest genres in film – and derived from the classical comedy in theatre –, some of the very first silent movies were comedies, as slapstick comedy often relies on visual depictions, without requiring sound. When sound films became more prevalent during the 1920s, comedy films took another swing, as laughter could result from burlesque situations but also dialogue.",
	},
	{
		name: "Crime",
		description: "Crime films, in the broadest sense, are a cinematic genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection.",
	},
	{
		name: "Romance",
		description: "Romance films or romance movies are romantic love stories recorded in visual media for broadcast in theaters and on TV that focus on passion, emotion, and the affectionate romantic involvement of the main characters and the journey that their love takes them through dating, courtship or marriage.",
	},
	{
		name: "Biography",
		description: "A biographical film, or biopic (/ˈbaɪoʊpɪk/; abbreviation for biographical motion picture), is a film that dramatizes the life of a non-fictional or historically-based person or people. Such films show the life of a historical person and the central character's real name is used.",
	},
]



let Directors = [
	{
		name: "Robert Redford",
		bio: "",
		birthyear: "",
		deathyear: ""
	},

	{
		name: "Sydney Pollack",
		bio: "",
		birthyear: "",
		deathyear: ""
	}, {
		name: "George Roy Hill",
		bio: "",
		birthyear: "",
		deathyear: ""
	},
	{
		name: "David Lowery",
		bio: "",
		birthyear: "",
		deathyear: ""
	},

	{
		name: "Adrian Lyne",
		bio: "",
		birthyear: "",
		deathyear: ""
	}, {
		name: "Ritesh Batra",
		bio: "",
		birthyear: "",
		deathyear: ""
	},

]


let Users = [
	{
		id: "0",
		name: "Michael Blunt",
		username: "Michael",
		password: "Mi123",
		email: "",
		birthday: "",
		favourites: ""

	},
	{
		id: "1",
		name: "Kate Norman",
		username: "Katie",
		password: "Kitty11",
		email: "",
		birthday: "",
		favourites: ""
	}

];
//GET requests
app.get("/", function (req, res) {
	res.send("Welcome to my Robert Redford movie collection!");
});
app.get("/documentation", function (req, res) {
	res.sendFile("public/documentation.html", { root: __dirname });
});
app.get("/movies", function (req, res) {
	res.json(Movies);
});

// app.get("/movies/:title", (req, res) => {
// 	res.json(
// 		Movies.find(movie => {
// 			return movie.title === req.params.title;
// 		})
// 	);
// });

app.get("/movies/:title", (req, res) => {
	res.json(
		Movies.find(movie => {
			return movie.title.toLowerCase().includes(req.params.title.toLowerCase());
		})
	);
});

//Get movie by genre
app.get("/genres/:name", (req, res) => {
	res.json(
		Genres.find(genre => {
			return genre.name.toLowerCase().includes(req.params.name.toLowerCase());
		})
	);
});

//Get data about directors by name
app.get("/directors/:name", (req, res) => {
	res.json(
		Directors.find(director => {
			return director.name.toLowerCase().includes(req.params.name.toLowerCase());
		})
	);
});

//Get the list of users
app.get("/users", (req, res) => {
	res.json(Users);
});

//Add data of a new user to the list of users
app.post("/users", (req, res) => {
	let newUser = req.body;

	if (!newUser.name) {
		const message = "Missing name in request body";
		res.status(400).send(message);
	} else {
		newUser.id = uuid.v4();
		Users.push(newUser);
		res.status(201).send(newUser);
	}
});

// Update the info of a user by id
app.put('/users/:id', (req, res) => {
	let user = Users.find((user) => { return user.id === req.params.id; });
	let newUserInfo = req.body;

	if (user && newUserInfo) {
		// preserve the user id
		newUserInfo.id = user.id;
		// preserve the user favorites
		newUserInfo.favorites = user.favorites;
		// merge old info and new info (TODO: validate new info)
		Object.assign(user, newUserInfo);
		// merge user with update info into the list of Users
		Users = Users.map((user) => (user.id === newUserInfo.id) ? newUserInfo : user);
		res.status(201).send(user);
	} else if (!newUserInfo.name) {
		const message = 'Missing name in request body';
		res.status(400).send(message);
	} else {
		res.status(404).send('User with id ' + req.params.id + ' was not found.');
	}
});

// Delete a user from the list by ID
app.delete("/users/:id", (req, res) => {
	let user = Users.find(user => {
		return user.id === req.params.id;
	});

	if (user) {
		Users = Users.filter(function (obj) {
			return obj.id !== req.params.id;
		});
		res.status(201).send("User " + user.name + req.params.id + " was deleted.");
	}
});


// Get a user from the list by ID
app.get('/users/:id', (req, res) => {
	res.json(Users.find((user) => { return user.id === req.params.id; }));
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
