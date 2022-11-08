import React, { useState, useEffect } from "react";
import "../App.css";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import Select from "../common/Dropdown";
import { useGlobalConfigContext } from "../App";


function Registration() {
  const serverDomain   = useGlobalConfigContext()["serverDomain"];
  const history = useHistory();
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [confirmPasswordReg, setConfirmPasswordReg] = useState("");
  const [passMatch, setPassMatch] = useState("");
  const [userThere, setUserThere] = useState("");

  const textAlign = {
    textAlign: "left",
    color: "#000000",
  };
  const signUp = {
    marginTop: "10px",
  };
  const signUpLink = {
    color: "#2580F6",
  };

  Axios.defaults.withCredentials = true;

  const register = () => {
    if (passwordReg != confirmPasswordReg) {
      setPassMatch("Passwords do not match!");
      return <h4 style={{ color: "red" }}>Passwords do not match</h4>;
    }
    if (emailReg.length == 0) {
      setUserThere("Please input all fieds!");
      return <h4 style={{ color: "red" }}>Username is Required</h4>;
    } else {
      Axios.post( serverDomain+"/register", {
        email: emailReg,
        password: passwordReg,
      }).then((response) => {
        console.log("User Registered: ", response);
        history.push("/login");
      });
    }
  };
  useEffect(() => {
    document.title = "Sign-Up";  
  }, []);
  return (
    <div className="container Registration">
      <div className="signInHeader">Sign Up Here</div>
      <Navbar
        className = "navbar-custom"
        variant="dark"
        fixed="top"
        expand="lg"
        collapseOnSelect
      >
        <Navbar.Brand>GetLooked</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href="/about">About Us</Nav.Link>
            <Nav.Link href="/login">Log In</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Form>
        <Form.Group
          style={textAlign}
          className="mb-3"
          controlId="formBasicEmail"
        >
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmailReg(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group
          style={textAlign}
          className="mb-3"
          controlId="formBasicPassword"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPasswordReg(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group
          style={textAlign}
          className="mb-3"
          controlId="formBasicPassword"
        >
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-enter Password"
            onChange={(e) => {
              setConfirmPasswordReg(e.target.value);
            }}
          />
        </Form.Group>

        <Button className="fullWidth" variant="primary" onClick={register}>
          Sign Up
        </Button>
        <div style={signUp}>
          Already a user?{" "}
          <a href="/login" style={signUpLink}>
            Login
          </a>{" "}
          here
        </div>
      </Form>
      {userThere}
      <br />
      {passMatch}
    </div>
  );
}
export default Registration;
