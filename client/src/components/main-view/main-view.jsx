import React from "react";
import axios from "axios";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
// import { Link } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      newUser: false,
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
    this.setState({
      user,
    });
  }
  render() {
    //   // If the state isn't initialized, this will throw on runtime
    //   // before the data is initially loaded
    const { movies, selectedMovie, user, newUser } = this.state;

    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    if (!user && !newUser);
    return (
      <RegistrationView
        onClick={() => this.alreadyMember()}
        onSignedIn={(user) => this.onSignedIn(user)}
      />
    );

    return (
      <React.Fragment>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>Cinema-App</Navbar.Brand>
          <Nav.Link href="login-view">Login</Nav.Link>
          <Nav.Link href="registration-view">Register</Nav.Link>
        </Navbar>
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
