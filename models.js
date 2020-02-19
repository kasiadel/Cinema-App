const mongoose = require('mongoose');
var movieSchema = mongoose.Schema({
    Title: { type: String, required: true },
    Description: { type: String, required: true },/*Movie Schema Defined*/
    Genre: {
        Name: String,
        Description: String
    },
    Director: {
        Name: String,
        Bio: String,
        Birth: Date,
        Death: Date
    },
    Actors: [String],
    ImagePath: String,
    Featured: Boolean
});

var userSchema = mongoose.Schema({

    Username: { type: String, required: true },/*User Schema Defined*/
    Password: { type: String, required: true },
    Email: { type: String, required: true },
    Birthday: Date,
    FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectID, ref: 'Movie' }]
});

var Movie = mongoose.model('Movie', movieSchema);/*Models Established to Interact with Schemas*/
var User = mongoose.model('User', userSchema);

module.exports.Movie = Movie; /*Models Exported*/
module.exports.User = User;
