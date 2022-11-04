import React, { useState, useEffect } from "react";
import "../App.css";
import Axios from "axios";
//import { withCookies, Cookies } from 'react-cookie';
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.css";
import {
  Nav,
  Navbar,
  NavDropdown,
  NavItem,
  Card,
  Button,
} from "react-bootstrap";
import { Redirect } from "react-router";
import { useHistory } from "react-router";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import housing from "../images/housing.jpg";
import employment from "../images/employment.jpg";
import basicNeeds from "../images/basicNeeds.jpg";
import favorites from "../images/favorites.jpg";
import health from "../images/health.jpg";
import hotline from "../images/hotline.jpg";
import information from "../images/information.jpg";
import mentalHealth from "../images/mentalHealth.jpg";
import substanceUse from "../images/substanceUse.jpg";
import universal from "../images/universal.jpg";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as fasB } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as farB } from "@fortawesome/free-regular-svg-icons";
import Popup from "../common/Popup";
import CommonNav from "../common/CommonNav";
import { useGlobalConfigContext } from "../App";

function Home() {
  const serverDomain   = useGlobalConfigContext()["serverDomain"];
  const history = useHistory();
  const [loggedInUser, setLoginUser] = useState("");
  const [data, setData] = useState(false);
  const [orgData, setOrgData] = useState([]);
  const [favData, setFavData] = useState([]);
  const [unit_org, setUnitOrgData] = useState([]);
  const cookieExists = (document.cookie.match(
    /^(?:.*;)?\s*userId\s*=\s*([^;]+)(?:.*)?$/
  ) || [, null])[1];
  Axios.defaults.withCredentials = true;
  const [active, setActive] = useState(false);

  const logoutUser = () => {
    Axios.post(serverDomain+"/logout", {}, { withCredentials: "true" });
    history.push("/login");
    window.location.reload();
  };

  const houseFunc = () => {
    history.push("/housing");
    window.location.reload();
  };
  const employFunc = () => {
    history.push("/employment");
    window.location.reload();
  };
  const basicNeedsFunc = () => {
    history.push("/basicNeeds");
    window.location.reload();
  };
  const healthFunc = () => {
    history.push("/health");
    window.location.reload();
  };
  const hotlineFunc = () => {
    history.push("/hotline");
    window.location.reload();
  };
  const informationFunc = () => {
    history.push("/information");
    window.location.reload();
  };
  const mentalHealthFunc = () => {
    history.push("/mentalHealth");
    window.location.reload();
  };
  const substanceUseFunc = () => {
    history.push("/substanceUse");
    window.location.reload();
  };
  const universalFunc = () => {
    history.push("/universal");
    window.location.reload();
  };
  const favFunc = () => {
    history.push("/favorites");
    window.location.reload();
  };

  useEffect(() => {
    document.title = "Home";  
    Axios.get(serverDomain+"/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginUser(response.data.user[0].username);
        setData(response.data);
      } 
    });
  }, []);

  return (
    <>
    <CommonNav />

    <div className="container home">
    <div class="p-5 text-center bg-image rounded-3 customerImage">
		  <div class="mask maskCustom">
			<div class="d-flex justify-content-center align-items-center h-100 p-3">
			  <div class="text-white">
				<h1 class="mb-3">Get looked at by recruiters!</h1>
				<h4 class="mb-3">register now to connect with coaches and scouts</h4>
				<a class="btn btn-outline-light btn-lg" href="sign-up.html" role="button">Sign Up</a>
			  </div>
			</div>
		  </div>
		</div>

      <div className="row">
      <div className="col-sm-4">
        <h3>News</h3>
        <p>Test Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
      </div>
      <div className="col-sm-4">
        <h3>Featured</h3>
        <p>Test Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
      </div>
      <div class="col-sm-4">
        <h3>Schools</h3>        
        <p>Test Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
      </div>
    </div>
    </div>
    </>
  );
}

export default Home;
