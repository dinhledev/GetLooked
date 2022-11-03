import React, { useState, useEffect } from "react";
import "../App.css";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import Select from "../common/Dropdown";
import { useGlobalConfigContext } from "../App";

/*

Release Date: yes/no
  if yes, enter date
Change Offense type to dropdown
change sentence length to drop down
Gender you identified as: male/female/other=>textfield


*/

function Registration() {
  const serverDomain   = useGlobalConfigContext()["serverDomain"];
  const history = useHistory();
  const [usernameReg, setUernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [confirmPasswordReg, setConfirmPasswordReg] = useState("");
  const [DOBReg, setDOBReg] = useState("");
  const [facilityReg, setFacilityReg] = useState("");
  const [offenseReg, setOffenseReg] = useState("");
  const [sentenceReg, setSentenceReg] = useState(0);
  const [passMatch, setPassMatch] = useState("");
  const [userThere, setUserThere] = useState("");

  const securityQuestion1RegList = ["What city were you born in?", "What color are your eyes?", "What was the name of the first school you attended"];
  const [securityQuestion1Reg, setSecurityQuestion1Reg] = useState(securityQuestion1RegList[0]);

  
  const securityQuestion2RegList = ["What is your preferred musical genre?", "What’s your grandmother’s first name?","Who is your favorite musical artist?"];
  const [securityQuestion2Reg, setSecurityQuestion2Reg] = useState(securityQuestion2RegList[0]);
  
  const securityQuestion3RegList = ["What was the name of your first pet", "Where is your favorite place?","What is your best friend’s first name?"];
  const [securityQuestion3Reg, setSecurityQuestion3Reg] = useState(securityQuestion3RegList[0]);

  const [securityAnswer1Reg, setSecurityAnswer1Reg] = useState("");
  const [securityAnswer2Reg, setSecurityAnswer2Reg] = useState("");
  const [securityAnswer3Reg, setSecurityAnswer3Reg] = useState("");

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
      console.log("HERERERE");
      return <h4 style={{ color: "red" }}>Passwords do not match</h4>;
    }
    if (usernameReg.length == 0 || securityAnswer1Reg.length == 0  || securityAnswer2Reg.length == 0 || securityAnswer3Reg.length == 0) {
      setUserThere("Please input all fieds!");
      return <h4 style={{ color: "red" }}>Username is Required</h4>;
    } else {
      Axios.post( serverDomain+"/register", {
        username: usernameReg,
        password: passwordReg,
        dob: DOBReg,
        facility_name: facilityReg,
        offense: offenseReg,
        sentence_length: sentenceReg,
        security_question_1: securityQuestion1Reg,
        security_question_2: securityQuestion2Reg,
        security_question_3: securityQuestion3Reg,
        answer_1: securityAnswer1Reg,
        answer_2: securityAnswer2Reg,
        answer_3: securityAnswer3Reg,
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
        <Navbar.Brand>Reentry and Corrections</Navbar.Brand>
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
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUernameReg(e.target.value);
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

        <Form.Group
          style={textAlign}
          className="mb-3"
          controlId="formBasicQuestion1"
        >
          <Form.Label>Security Question 1</Form.Label>
          <Form.Select
                  onChange={(e) => {
                      setSecurityQuestion1Reg(e.target.value);
                  }}>
                  {securityQuestion1RegList.map(item => (
                  <option value={item}>
                    {item}
                  </option>
                ))}
          </Form.Select>
        </Form.Group>

        <Form.Group
          style={textAlign}
          className="mb-3"
          controlId="formBasicAnswer1"
        >
          <Form.Label>Security Answer 1</Form.Label>
          <Form.Control
            type="text"
            placeholder="Security Answer 1"
            onChange={(e) => {
              setSecurityAnswer1Reg(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group
          style={textAlign}
          className="mb-3"
          controlId="formBasicQuestion2"
        >
          <Form.Label>Security Question 2</Form.Label>
          <Form.Select
                  onChange={(e) => {
                      setSecurityQuestion2Reg(e.target.value);
                  }}>
                  {securityQuestion2RegList.map(item => (
                  <option value={item}>
                    {item}
                  </option>
                ))}
          </Form.Select>
        </Form.Group>
        <Form.Group
          style={textAlign}
          className="mb-3"
          controlId="formBasicAnswer2"
        >
          <Form.Label>Security Answer 2</Form.Label>
          <Form.Control
            type="text"
            placeholder="Security Answer 2"
            onChange={(e) => {
              setSecurityAnswer2Reg(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group
          style={textAlign}
          className="mb-3"
          controlId="formBasicQuestion3"
        >
          <Form.Label>Security Question 3</Form.Label>
          <Form.Select
                  onChange={(e) => {
                      setSecurityQuestion3Reg(e.target.value);
                  }}>
                  {securityQuestion3RegList.map(item => (
                  <option value={item}>
                    {item}
                  </option>
                ))}
          </Form.Select>
        </Form.Group>
        <Form.Group
          style={textAlign}
          className="mb-3"
          controlId="formBasicAnswer3"
        >
          <Form.Label>Security Answer 3</Form.Label>
          <Form.Control
            type="text"
            placeholder="Security Answer 3"
            onChange={(e) => {
              setSecurityAnswer3Reg(e.target.value);
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
