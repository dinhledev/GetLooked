import React, { useState, useEffect } from "react";
import Axios from "axios";
import logo from "../images/GetLooked-text.png";
import {
  Nav,
  Navbar,
  NavDropdown,
  NavItem,
  Card,
  Button,
} from "react-bootstrap";
import Container from 'react-bootstrap/Container';

import { useHistory } from "react-router";
import classNames from "classnames";
import { useGlobalConfigContext } from "../App";
function CommonNav() {
  const serverDomain   = useGlobalConfigContext()["serverDomain"];
  const history = useHistory();
  const [loggedInUser, setLoginUser] = useState("");
  const [data, setData] = useState(false);

  const logoutUser = () => {
    Axios.post( serverDomain+"/logout", {}, { withCredentials: "true" });
    history.push("/login");
    window.location.reload();
  };

  useEffect(() => {
    document.title = "Home";  
    Axios.get(serverDomain+"/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginUser(response.data.user[0].email);
        setData(response.data);
      } 
    });
  }, []);
  return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="home"> 
          <Card.Img
          style={{ width: "5rem", height: "2rem" }}
          variant="top"
          src={logo}
          />
      </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/favorites">Athletes</Nav.Link>
            <Nav.Link href="/profile">Coaches</Nav.Link>
            <Nav.Link href="/myPlans">Schools</Nav.Link>
            <Nav.Link href="/myPlans">About Us</Nav.Link>
            <Nav.Link href="/myPlans">Contact</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="profile">Hi, {loggedInUser} </Nav.Link>
            <Nav.Link onClick={logoutUser}> Logout </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default CommonNav;
