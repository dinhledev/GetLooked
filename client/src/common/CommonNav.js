import React, { useState, useEffect } from "react";
import Axios from "axios";
import logo from "../images/GetLooked-1.png";
import {
  Nav,
  Navbar,
  NavDropdown,
  NavItem,
  Card,
  Button,
} from "react-bootstrap";
import { useHistory } from "react-router";
import classNames from "classnames";
import { useGlobalConfigContext } from "../App";
function CommonNav() {
  const serverDomain   = useGlobalConfigContext()["serverDomain"];
  const history = useHistory();

  const logoutUser = () => {
    Axios.post( serverDomain+"/logout", {}, { withCredentials: "true" });
    history.push("/login");
    window.location.reload();
  };

  return (
    <Navbar
      className="navbar-custom"
      variant="dark"
      fixed="top"
      expand="lg"
      collapseOnSelect
    >
      <Navbar.Toggle />
      <Card.Img
              style={{ width: "5rem", height: "2rem" }}
              variant="top"
              src={logo}
            />

      <Navbar.Collapse>
        <Nav>
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/favorites">Athletes</Nav.Link>
          <Nav.Link href="/profile">Coaches</Nav.Link>
          <Nav.Link href="/myPlans">Schools</Nav.Link>
          <Nav.Link href="/myPlans">About Us</Nav.Link>
          <Nav.Link href="/myPlans">Contact</Nav.Link>
          <Nav.Link onClick={logoutUser}> Logout </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CommonNav;
