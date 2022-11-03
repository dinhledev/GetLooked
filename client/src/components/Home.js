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
    <div className="container home">
      <CommonNav />
      <div className="row justify-content-center">
        <div className="col-3">
          <Card style={{ cursor: "pointer" }} onClick={houseFunc}>
            <Card.Img
              style={{ width: "19rem", height: "10rem" }}
              variant="top"
              src={housing}
            />
            <Card.Body>
              <Card.Title>Housing Organizations</Card.Title>
              <Card.Text>
                Housing Organizations include day shelters, shelters,
                transitional housing, permanent housing support.
              </Card.Text>
              <Button className="fullWidth" variant="primary">
                See More
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-3">
          <Card style={{ cursor: "pointer" }} onClick={employFunc}>
            <Card.Img
              style={{ width: "19rem", height: "10rem" }}
              variant="top"
              src={employment}
            />
            <Card.Body>
              <Card.Title>Employment Organizations</Card.Title>
              <Card.Text>
                Organizations and resources that support individuals in getting
                a job, and different educational certificates.
              </Card.Text>
              <Button className="fullWidth" variant="primary">
                See More
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-3">
          <Card style={{ cursor: "pointer" }} onClick={basicNeedsFunc}>
            <Card.Img
              style={{ width: "19rem", height: "10rem" }}
              variant="top"
              src={basicNeeds}
            />
            <Card.Body>
              <Card.Title>Basic Needs</Card.Title>
              <Card.Text>
                Organizations that provide basic needs: Emergency assistance,
                clothing assistance, food assistance.
              </Card.Text>
              <Button className="fullWidth" variant="primary">
                See More
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-3">
          <Card style={{ cursor: "pointer" }} onClick={healthFunc}>
            <Card.Img
              style={{ width: "19rem", height: "10rem" }}
              variant="top"
              src={health}
            />
            <Card.Body>
              <Card.Title>Health Organizations</Card.Title>
              <Card.Text>
                Organizations include those that provide low-cost services:
                Dental, HIV/AIDS, primary care clinics.
              </Card.Text>
              <Button className="fullWidth" variant="primary">
                See More
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-3">
          <Card style={{ cursor: "pointer" }} onClick={hotlineFunc}>
            <Card.Img
              style={{ width: "19rem", height: "10rem" }}
              variant="top"
              src={hotline}
            />
            <Card.Body>
              <Card.Title>Hotline Services</Card.Title>
              <Card.Text>
                Provides information on hotlines that can be contacted in an
                emergency or crisis situation.
              </Card.Text>
              <Button className="fullWidth" variant="primary">
                See More
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-3">
          <Card style={{ cursor: "pointer" }} onClick={informationFunc}>
            <Card.Img
              style={{ width: "19rem", height: "10rem" }}
              variant="top"
              src={information}
            />
            <Card.Body>
              <Card.Title>Social Service Information</Card.Title>
              <Card.Text>
                Provides information on how to apply social services and learn
                which ones you are eligible for.
              </Card.Text>
              <Button className="fullWidth" variant="primary">
                See More
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-3">
          <Card style={{ cursor: "pointer" }} onClick={mentalHealthFunc}>
            <Card.Img
              style={{ width: "19rem", height: "10rem" }}
              variant="top"
              src={mentalHealth}
            />
            <Card.Body>
              <Card.Title>Mental Health Organizations</Card.Title>
              <Card.Text>
                Organizations that can provide mental health support which are
                low-cost to free services.
              </Card.Text>
              <Button className="fullWidth" variant="primary">
                See More
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-3">
          <Card style={{ cursor: "pointer" }} onClick={substanceUseFunc}>
            <Card.Img
              style={{ width: "19rem", height: "10rem" }}
              variant="top"
              src={substanceUse}
            />
            <Card.Body>
              <Card.Title>Substance Use Services</Card.Title>
              <Card.Text>
                Services for overcoming substance use disorder: Recovery
                services, outpatient care, housing.
              </Card.Text>
              <Button className="fullWidth" variant="primary">
                See More
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-3">
          <Card style={{ cursor: "pointer" }} onClick={universalFunc}>
            <Card.Img
              style={{ width: "19rem", height: "10rem" }}
              variant="top"
              src={universal}
            />
            <Card.Body>
              <Card.Title>Universal Services</Card.Title>
              <Card.Text>
                Organizations that provide wrap-around services to their
                clients: Housing, healthcare, education, etc.
              </Card.Text>
              <Button className="fullWidth" variant="primary">
                See More
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-3">
          <Card style={{ cursor: "pointer" }} onClick={favFunc}>
            <Card.Img
              style={{ width: "19rem", height: "10rem" }}
              variant="top"
              src={favorites}
            />
            <Card.Body>
              <Card.Title>Favorites</Card.Title>
              <Card.Text>
                These are Organizations that you favored. Shows a list of your
                favorite organizations.
              </Card.Text>
              <Button className="fullWidth" variant="primary">
                See More
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;
