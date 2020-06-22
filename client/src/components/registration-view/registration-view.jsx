import React, { useState } from "react";
import "./registration-view.scss";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";

export function RegistrationView(props) {
  const [username, createUsername] = useState("");
  const [password, createPassword] = useState("");
  const [email, createEmail] = useState("");
  const [birthday, createBirthday] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post("https://tranquil-river-08432.herokuapp.com/users", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
      .then((response) => {
        props.onRegisterSuccess();
      })
      .catch((e) => {
        console.log("error registering the user");
      });
  };

  return (
    <Container>
      <Form className="registration-form">
        <Form.Group controlId="formBasicUsername">
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => createUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="text"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => createPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => createEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicBirthday">
          <Form.Control
            type="text"
            placeholder="Enter Date of Birth"
            value={birthday}
            onChange={(e) => createBirthday(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="btn-lg btn-secondary"
          type="submit"
          onClick={handleRegister}
        >
          Register
        </Button>
      </Form>
    </Container>
  );
}
RegistrationView.propTypes = {
  onRegisterSuccess: PropTypes.func.isRequired,
};
