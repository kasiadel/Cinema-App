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

export const MODES = {
  LOGIN: "login",
  MOVIES: "movies",
  REGISTER: "register",
  MOVIE: "movie",
};

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      mode: MODES.LOGIN,
      movies: null,
      selectedMovie: null,
      user: null,
      //register: null,
    };
  }

  // One of the "hooks" available in a React Component
  // componentDidMount() {
  //   axios
  //     .get("https://tranquil-river-08432.herokuapp.com/movies/")
  //     .then((response) => {
  //       // Assign the result to the state
  //       this.setState({
  //         movies: response.data,
  //       });
  //     })
  //     .catch(function (error) {
  //       // console.log(error);
  //     });
  // }

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

  // nullifyRegister = () => {
  //   alert("hello from nullifyReg");
  // };
  //this.setState({ register: null });
  // };

  // onLoggedIn(user) {
  //   this.setState({
  //     //console.log(user);
  //     user,
  //     mode: MODES.MOVIES,
  //   });
  // }
  getMovies(token) {
    axios
      .get("https://tranquil-river-08432.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }
  setRegisterMode = () => {
    this.setState({
      mode: MODES.REGISTER,
    });
  };

  render() {
    //   // If the state isn't initialized, this will throw on runtime
    //   // before the data is initially loaded
    const { movies, selectedMovie, user, register, mode } = this.state;

    // if (!user)
    //   return (
    //     <LoginView
    //       onLoggedIn={(user) => this.onLoggedIn(user)}
    //       onRegisterRedirect={this.setRegisterMode}
    //     />
    //   );

    if (mode === MODES.LOGIN) {
      return (
        <div>
          <div>{this.state.mode}</div>
          <LoginView
            onLoggedIn={(user) => this.onLoggedIn(user)}
            onRegisterRedirect={this.setRegisterMode}
          />
        </div>
      );
    }

    if (mode === MODES.REGISTER) {
      return (
        <RegistrationView
          onClick={() => {
            console.log("onclick zawolane");
          }}
          onSignedIn={() => console.log("onsignedin zawolane")}
        />
      );
    }

    // if (register === false)
    // //   return <RegistrationView onClick={() />;

    // if (!user && !register);
    // return (
    //   <RegistrationView
    //     onClick={() => this.alreadyMember()}
    //     onSignedIn={(user) => this.onSignedIn(user)}
    //   />
    // );

    return (
      <React.Fragment>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>Cinema-App</Navbar.Brand>
          {/* <Nav.Link href="login-view">Login</Nav.Link>
          <Nav.Link href="registration-view">Register</Nav.Link> */}
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
