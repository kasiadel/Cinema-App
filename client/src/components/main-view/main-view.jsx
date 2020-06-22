import React from "react";
import axios from "axios";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";

import {
  Navbar,
  Row,
  Container,
  Button,
  Form,
  Nav,
  Col,
  FormControl,
} from "react-bootstrap";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      view: "login",
    };
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    axios
      .get("https://tranquil-river-08432.herokuapp.com/movies/")
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        // console.log(error);
      });
  }

  resetSelectedMovie() {
    this.setState({
      selectedMovie: null,
    });
  }
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  onLoggedIn(user) {
    const view = "movies";
    this.setState({
      //console.log(user);
      user,
      view,
    });
  }

  setViewState(view) {
    // view could be one of ['login', 'register', 'movies']
    this.setState({
      view,
    });
  }
  render() {
    //   // If the state isn't initialized, this will throw on runtime
    //   // before the data is initially loaded
    const { movies, selectedMovie, user, view } = this.state;

    const MenuBar = (
      <Navbar bg="light">
        <Button
          variant="primary"
          size="sm ml-2 mr-2"
          onClick={() => this.setViewState("login")}
        >
          Login
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => this.setViewState("register")}
        >
          Register
        </Button>
      </Navbar>
    );

    if (view === "login") {
      return (
        <React.Fragment>
          {MenuBar}
          <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
        </React.Fragment>
      );
    } else if (view === "register") {
      return (
        <React.Fragment>
          {MenuBar}

          <RegistrationView
            onRegisterSuccess={() => this.setViewState("login")}
          />
        </React.Fragment>
      );
    }
    // Login view is fine, now we care about the registration view
    // Or we only need one props, incase register fine, if not, we handle it there
    // We pass two props to the RegistrationView, corresponding to the 2 cases
    // The alreadyMember and onSignedIn we don't use yet
    // Then view is always login, as we don't change it, we need to change it to another view when user clicks on sth
    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;
    return (
      <React.Fragment>
        {}
        {MenuBar}

        {selectedMovie ? (
          <MovieView movie={selectedMovie} />
        ) : (
          <div className="main-view card-deck">
            {movies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                onClick={(movie) => this.onMovieClick(movie)}
              />
            ))}
          </div>
        )}
      </React.Fragment>
    );
  }
}
