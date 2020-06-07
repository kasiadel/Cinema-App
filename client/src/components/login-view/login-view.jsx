import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login-view.scss";
import PropTypes from "prop-types";
import axios from "axios";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(username, password);
  //   /* Send a request to the server for authentication */
  //   /* then call props.onLoggedIn(username) */
  //   props.onLoggedIn(username);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios
      .post("http://localhost:1234//login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log("no such user");
      });
  };

  const handleRegisterRedirect = () => {
    //alert("handle reg red w loginview");
    props.onRegisterRedirect();
  };

  return (
    <Form className="login-form">
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button
        variant="btn-lg btn-secondary btn-block"
        type="submit"
        onClick={handleSubmit}
      >
        Login
      </Button>
      <Button
        variant="btn-lg btn-secondary btn-block"
        // type="submit"
        onClick={handleRegisterRedirect}
      >
        New User
      </Button>
    </Form>
  );
}
