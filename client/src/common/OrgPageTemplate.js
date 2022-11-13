import React, { useState, useEffect } from "react";
import "../App.css";
import Axios from "axios";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.css";
import {
  Nav,
  Navbar,
  NavDropdown,
  NavItem,
  Card,
  Button,
  Form
} from "react-bootstrap";
import { Redirect } from "react-router";
import { useHistory } from "react-router";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as fasB } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as farB } from "@fortawesome/free-regular-svg-icons";
import Popup from "../common/Popup";
import Pagination from "react-bootstrap/Pagination";
import CommonNav from "../common/CommonNav";
import CommonOrgPageHeader from "../common/CommonOrgPageHeader";
import { useGlobalConfigContext } from "../App";

function OrgPageTemplate({pageName,tittlePage}) {
  const serverDomain   = useGlobalConfigContext()["serverDomain"];
  const history = useHistory();
  const [loggedInUser, setLoginUser] = useState("");
  const [data, setData] = useState("");
  const [unit_org, setUnitOrgData] = useState([]);
  const [active, setActive] = useState(false);
  const [favData, setFavData] = useState([]);
  Axios.defaults.withCredentials = true;
  const cookieExists = (document.cookie.match(
    /^(?:.*;)?\s*userId\s*=\s*([^;]+)(?:.*)?$/
  ) || [, null])[1];
  const [buttonPoup, setButtonPoup] = useState(false);
  const [checked, setChecked] = useState(false);
  
  const [keyWords, setKeyWords] = useState([]);
  // Keywords for housing page
  const [menChecked, setMenChecked] = useState(false);

  // const for paging
  const [offset, setOffset] = useState(0);
  const [orgData, setOrgData] = useState([]);
  const [perPage] = useState(4);
  const [pageCount, setPageCount] = useState(0);
  const [selectedPage, setselectedPage] = useState(1);
  const [totalOrg, setTotalOrg] = useState(0);
  const nextClickPaging = (e) => {
    setOffset(offset + perPage);
    setselectedPage(selectedPage + 1);
  };
  const lastClickPaging = (e) => {
    if (totalOrg % perPage == 0) {
      setOffset(totalOrg - perPage);
    } else {
      setOffset(totalOrg - (totalOrg % perPage));
    }
    setselectedPage(pageCount);
  };

  const preClickPaging = (e) => {
    setOffset(offset - perPage);
    setselectedPage(selectedPage - 1);
  };
  const firstClickPaging = (e) => {
    setOffset(0);
    setselectedPage(1);
  };

  // handle filter for other pages
  const handleChangePoupFilterByPhotoID = () => {
    setChecked(!checked);
    setOffset(0)
    setselectedPage(1);
  };
  const checkPhotoIDKeyWord = () => {
    return checked;
  };

  // BEGIN handle filter for housing page
  const handleFilterHousingMenKeyWord = () => {
    setMenChecked(!menChecked)
    setOffset(0)
    setselectedPage(1);
  };
  const checkHousingMenKeyWord = () => {
    return menChecked;
  };
  // END handle filter for housing page
 
  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
        {label}
      </label>
    );
  };

  const getOrganizations = (id) => {
    Axios.get( serverDomain+"/"+ pageName +"/" + id).then((response) => {
      setActive(id);
      setUnitOrgData(response.data[0]);
    });
  };

  const checkActive = (id) => {
    return id === active;
  };

  // check filter or not 
  const getInit = (accountId) => {
    if (menChecked ==false && checked == false) {
      Axios.get( serverDomain+"/"+ pageName +"/getAll").then((response) => {
        setTotalOrg(response.data.length);
        setPageCount(Math.ceil(response.data.length / perPage));
      });
      Axios.post( serverDomain+"/"+ pageName, {
        offset: offset,
        perPage: perPage,
      }).then((response) => {
        if(response.data.length > 0) {
          setOrgData(response.data);
          if (accountId <= 0) {
            accountId = response.data[0].account_id;
          }
          getOrganizations(accountId);
        }
      });
    } else {
      let listKeyWord = [];
      // housing
      if(menChecked) {
        listKeyWord.push("Men");
      }
      Axios.post( serverDomain+"/"+ pageName +"/getAllHasID",{
        keyWords : listKeyWord
      }).then(
        (response) => {
          setTotalOrg(response.data.length);
          setPageCount(Math.ceil(response.data.length / perPage));
        }
      );
      Axios.post( serverDomain+"/"+ pageName +"/hasID", {
        keyWords : listKeyWord,
        offset: offset,
        perPage: perPage,
      }).then((response) => {
        if(response.data.length > 0) {
          setOrgData(response.data);
          if (accountId <= 0) {
            accountId = response.data[0].org_id;
          }
          getOrganizations(accountId);
        }
      });
    }
  };
  useEffect(() => {
    document.title = tittlePage;  
    Axios.get( serverDomain+"/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginUser(response.data.user[0].first_name);
        setData(response.data);
        getInit(0);
      } else {
        history.push("/login");
      }
    });
  }, [offset,checked,menChecked]);

  return (
    <>
    <CommonNav />
    <div className="container home">
      <CommonOrgPageHeader tittlePage= {tittlePage}/>
      <div className="org_filter">
        <main>
          <Button
            onClick={() => setButtonPoup(true)}
            className="fullWidth"
            variant="primary"
          >
            Filter Athletes
          </Button>
        </main>

        {/* BEGIN housing page  */}
        {pageName == "athletes" &&
          <Popup trigger={buttonPoup} setTrigger={setButtonPoup}>
            {/* <span>Filter by: </span> */}
            <br></br>
            <Button
              bsPrefix="super-btn"
              value={menChecked}
              onClick={(e) => {
                handleFilterHousingMenKeyWord();
              }}
              className={classNames({
                keyWords: true,
                btnFilterCustom: checkHousingMenKeyWord()
              })}
            >
              Male
            </Button>
            <Button
              bsPrefix="super-btn"
              value={menChecked}
              onClick={(e) => {
                handleFilterHousingMenKeyWord();
              }}
              className={classNames({
                keyWords: true,
                btnFilterCustom: checkHousingMenKeyWord()
              })}
            >
              Female
            </Button>
            <Button
              bsPrefix="super-btn"
              value={menChecked}
              onClick={(e) => {
                handleFilterHousingMenKeyWord();
              }}
              className={classNames({
                keyWords: true,
                btnFilterCustom: checkHousingMenKeyWord()
              })}
            >
              &gt; 1 YOE
            </Button>

          </Popup>          
        } 
        {/* END housing page  */}
      </div>
      {totalOrg > 0 ? (
        <div className="homeDisplay">
          <div className="disp1">
            <h5>Total Athletes: {totalOrg}</h5>
            {orgData.map(function(org) {
              if (loggedInUser.length == 0) {
                history.push("/login");
              }
              return (
                <div
                  onClick={() => getOrganizations(org.account_id)}
                  className={classNames({
                    ldisp: true,
                    active: checkActive(org.account_id),
                  })}
                >
                  <div className="ttl">{org.first_name}</div>
                  <div className="subttl">{org.position}</div>
                </div>
              );
            })}
          </div>
          <div className="disp2">
            <div className="row">
              <div className="col-3">
                <Card style={{ cursor: "pointer" }}>
                  <Card.Img
                    variant="top"
                    src={require('../images/slush.jpg')}
                  />
                  <Card.Body>
                    <Card.Title>{unit_org.first_name} {unit_org.last_name}</Card.Title>
                    <Card.Text>
                      {unit_org.email}
                    </Card.Text>
                    <Button className="fullWidth" variant="primary">
                      Contact me
                    </Button>
                  </Card.Body>
                </Card>
              </div>
              <div className="col">
                <Card style={{ cursor: "pointer" }}>
                  <Card.Body>
                    <Card.Title>About me</Card.Title>
                    <Card.Text>
                    {unit_org.about}
                    </Card.Text>
                    <Card.Title>DOB</Card.Title>
                    <Card.Text>
                    {unit_org.date_of_birth}
                    </Card.Text>
                    <Card.Title>Height</Card.Title>
                    <Card.Text>
                    {unit_org.height}
                    </Card.Text>
                    <Card.Title>Weight</Card.Title>
                    <Card.Text>
                    {unit_org.weight}
                    </Card.Text>
                    <Card.Title>Sport</Card.Title>
                    <Card.Text>
                    {unit_org.sport}
                    </Card.Text>
                    <Card.Title>Position</Card.Title>
                    <Card.Text>
                    {unit_org.position}
                    </Card.Text>
                    <Card.Title>Organization Name</Card.Title>
                    <Card.Text>
                    {unit_org.org_name}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h3>There is no records</h3>
      )}
        <div className="pagingWrap">
            <Pagination>
              {selectedPage <= 1 ? (
                <Pagination.First disabled />
              ) : (
                <Pagination.First onClick={() => firstClickPaging()} />
              )}

              {selectedPage <= 1 ? (
                <Pagination.Prev disabled />
              ) : (
                <Pagination.Prev onClick={() => preClickPaging()} />
              )}
              <Pagination.Item>
                page {selectedPage} of {pageCount}
              </Pagination.Item>

              {selectedPage >= pageCount ? (
                <Pagination.Next disabled />
              ) : (
                <Pagination.Next onClick={() => nextClickPaging()} />
              )}

              {selectedPage >= pageCount ? (
                <Pagination.Last disabled />
              ) : (
                <Pagination.Last onClick={() => lastClickPaging()} />
              )}
            </Pagination>
        </div>
    </div>
    <div class="mt-5 p-4 bg-dark text-white text-center">
        <p>GetLooked © 2022</p>
    </div>
    </>
  );
}
export default OrgPageTemplate;
