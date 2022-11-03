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
  const [womenChecked, setWomenChecked] = useState(false);
  const [familiesChecked, setFamiliesChecked] = useState(false);
  const [socialSercurityChecked, setSocialSercurityChecked] = useState(false);
  const [plus60Checked, setPlus60Checked] = useState(false);
  const [substanceFreeChecked, setSubstanceFreeChecked] = useState(false);
  const [hivPositiveChecked, setHIVPositiveChecked] = useState(false);
  const [survivorDomisticViolenceChecked, setSurvivorDomisticViolenceChecked] = useState(false);

  // Keywords for health page
  const [photoIDChecked, setPhotoIDChecked] = useState(false);
  const [substanceUseChecked, setSubstanceUseChecked] = useState(false);
  const [residentVirginiaChecked, setResidentVirginiaChecked] = useState(false);
  const [pregnantChecked, setPregnantChecked] = useState(false);

  // Keywords for Substance use page
  const [mentalIllnessChecked, setMentalIllnessChecked] = useState(false);
  const [medicaidChecked, setMedicaidChecked] = useState(false);
  const [medicareChecked, setMedicareChecked] = useState(false);

  // Keywords for Mental page
  const [seriousMentalIllnessChecked, setSeriousMentalIllnessChecked] = useState(false);
  const [chronicIllnessChecked, setChronicIllnessChecked] = useState(false);
  const [traumaChecked, setTraumaChecked] = useState(false);
  const [homelessChecked, setHomelessChecked] = useState(false);
  const [deafHearingImpairedChecked, setDeafHearingImpairedChecked] = useState(false);
  const [intellectualDisabilityChecked, setIntellectualDisabilityChecked] = useState(false);
  const [returningCitizensChecked, setReturningCitizensChecked] = useState(false);


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
  const handleFilterHousingWomenKeyWord = () => {
    setWomenChecked(!womenChecked);
    setOffset(0)
    setselectedPage(1);
  };

  const handleFilterHousingFamiliesKeyWord = () => {
    setFamiliesChecked(!familiesChecked);
    setOffset(0)
    setselectedPage(1);
  };
  const handleFilterHousingSocialSercurityKeyWord = () => {
    setSocialSercurityChecked(!socialSercurityChecked);
    setOffset(0)
    setselectedPage(1);
  };
  const handleFilterHousingPlus60KeyWord = () => {
    setPlus60Checked(!plus60Checked);
    setOffset(0)
    setselectedPage(1);
  };
  const handleFilterHousingSubstanceFreeKeyWord = () => {
    setSubstanceFreeChecked(!substanceFreeChecked);
    setOffset(0)
    setselectedPage(1);
  };
  const handleFilterHousingHIVPositiveKeyWord = () => {
    setHIVPositiveChecked(!hivPositiveChecked);
    setOffset(0)
    setselectedPage(1);
  };
  const handleFilterHousingSurvivorDomisticViolenceKeyWord = () => {
    setSurvivorDomisticViolenceChecked(!survivorDomisticViolenceChecked);
    setOffset(0)
    setselectedPage(1);
  };
  const checkHousingMenKeyWord = () => {
    return menChecked;
  };
  const checkHousingWomenKeyWord = () => {
    return womenChecked;
  };
  const checkHousingFamiliesKeyWord = () => {
    return familiesChecked;
  };
  const checkHousingSocialSercurityKeyWord = () => {
    return socialSercurityChecked;
  };
  const checkHousingPlus60KeyWord = () => {
    return plus60Checked;
  };
  const checkHousingSubstanceFreeKeyWord = () => {
    return substanceFreeChecked;
  };
  const checkHousingHIVPositiveKeyWord = () => {
    return hivPositiveChecked;
  };
  const checkHousingSurvivorDomisticViolenceKeyWord = () => {
    return survivorDomisticViolenceChecked;
  };
  // END handle filter for housing page

    // BEGIN handle filter for health page
    const handleFilterHealthPhotoIdKeyWord = () => {
      setPhotoIDChecked(!photoIDChecked)
      setOffset(0)
      setselectedPage(1);
    };
    const handleFilterHealthSubstanceUseKeyWord = () => {
      setSubstanceUseChecked(!substanceUseChecked);
      setOffset(0)
      setselectedPage(1);
    };
  
    const handleFilterHealthResidentVirginiaKeyWord = () => {
      setResidentVirginiaChecked(!residentVirginiaChecked);
      setOffset(0)
      setselectedPage(1);
    };
    const handleFilterHealthPregnantKeyWord = () => {
      setPregnantChecked(!pregnantChecked);
      setOffset(0)
      setselectedPage(1);
    };
  
    const checkHealthPhotoIDKeyWord = () => {
      return photoIDChecked;
    };
    const checkHealthSubstanceUseKeyWord = () => {
      return substanceUseChecked;
    };
    const checkHealthResidentVirginiaKeyWord = () => {
      return residentVirginiaChecked;
    };
    const checkHealthPregnantKeyWord = () => {
      return pregnantChecked;
    };
    // END handle filter for health page


    // BEGIN handle filter for substance use page
    const handleFilterSubstanceUseSubstanceUseKeyWord = () => {
      setSubstanceUseChecked(!substanceUseChecked);
      setOffset(0)
      setselectedPage(1);
    };
    const handleFilterSubstanceUseMentalIllnessKeyWord = () => {
      setMentalIllnessChecked(!mentalIllnessChecked);
      setOffset(0)
      setselectedPage(1);
    };
    const handleFilterSubstanceUseMedicaidKeyWord = () => {
      setMedicaidChecked(!medicaidChecked);
      setOffset(0)
      setselectedPage(1);
    };
    const handleFilterSubstanceUseMedicareKeyWord = () => {
      setMedicareChecked(!medicareChecked);
      setOffset(0)
      setselectedPage(1);
    };
  
    const checkSubstanceUseSubstanceUseKeyWord = () => {
      return substanceUseChecked;
    };
    const checkSubstanceUseMentalIllnessKeyWord = () => {
      return mentalIllnessChecked;
    };
    const checkSubstanceUseMedicaidKeyWord = () => {
      return medicaidChecked;
    };
    const checkSubstanceUseMedicareKeyWord = () => {
      return medicareChecked;
    };
    // END handle filter for substance use page

    // BEGIN handle filter for mental  page
    const handleFilterMentalMedicaidKeyWord = () => {
      setMedicaidChecked(!medicaidChecked);
      setOffset(0)
      setselectedPage(1);
    };
    const handleFilterMentalMedicareKeyWord = () => {
      setMedicareChecked(!medicareChecked);
      setOffset(0)
      setselectedPage(1);
    };
    const handleFilterMentalSeriousMentalIllnessdKeyWord = () => {
      console.log("handleFilterMentalSeriousMentalIllnessdKeyWord")
      setSeriousMentalIllnessChecked(!seriousMentalIllnessChecked);
      setOffset(0)
      setselectedPage(1);
    };
    const handleFilterMentalChronicIllnessKeyWord = () => {
      setChronicIllnessChecked(!chronicIllnessChecked);
      setOffset(0)
      setselectedPage(1);
    };
    const handleFilterMentalTraumaKeyWord = () => {
      setTraumaChecked(!traumaChecked);
      setOffset(0)
      setselectedPage(1);
    };
    const handleFilterMentalSurvivorDomisticViolenceKeyWord = () => {
      setSurvivorDomisticViolenceChecked(!survivorDomisticViolenceChecked);
      setOffset(0)
      setselectedPage(1);
    };
    const handleFilterMentalHomelessKeyWord = () => {
      setHomelessChecked(!homelessChecked);
      setOffset(0)
      setselectedPage(1);
    };
    const handleFilterMentalDeafHearingImpairedKeyWord = () => {
      setDeafHearingImpairedChecked(!deafHearingImpairedChecked);
      setOffset(0)
      setselectedPage(1);
    };
    const handleFilterMentalIntellectualDisabilityKeyWord = () => {
      setIntellectualDisabilityChecked(!intellectualDisabilityChecked);
      setOffset(0)
      setselectedPage(1);
    };
    const handleFilterMentalReturningCitizensKeyWord = () => {
      setReturningCitizensChecked(!returningCitizensChecked);
      setOffset(0)
      setselectedPage(1);
    };

    const checkMentalMedicaidKeyWord = () => {
      return medicaidChecked;
    };
    const checkMentalMedicareKeyWord = () => {
      return medicareChecked;
    };
    const checkMentalSeriousMentalIllnessKeyWord = () => {
      return seriousMentalIllnessChecked;
    };
    const checkMentalChronicIllnessKeyWord = () => {
      return chronicIllnessChecked;
    };
    const checkMentalTraumaKeyWord = () => {
      return traumaChecked;
    };
    const checkMentalSurvivorDomisticViolenceKeyWord = () => {
      return survivorDomisticViolenceChecked;
    };
    const checkMentalHomelessKeyWord = () => {
      return homelessChecked;
    };
    const checkMentalDeafHearingImpairedKeyWord = () => {
      return deafHearingImpairedChecked;
    };
    const checkMentalIntellectualDisabilityKeyWord = () => {
      return intellectualDisabilityChecked;
    };
    const checkMentalReturningCitizensKeyWord = () => {
      return returningCitizensChecked;
    };
    // END handle filter for mental page
 
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

  const isFavorite = (id) => {
    for (let i = 0; i < favData.length; i++) {
      if (favData[i].org_id === id) {
        return true;
      }
    }
    return false;
  };

  const getFavOrganizations = () => {
    Axios.get( serverDomain+"/favorites/").then((response) => {
      setFavData(response.data);
    });
  };

  const addToFavorites = (obj) => {
    Axios.post( serverDomain+"/favorites/", {
      organization_id: obj.org_id,
    })
      .then(function(response) {
        console.log("obj.org_id " + obj.org_id);
        getInit(obj.org_id);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const removeFromFavorites = (obj) => {
    Axios.delete( serverDomain+"/favorites/", {
      data: {
        organization_id: obj.org_id,
      },
    })
      .then(function(response) {
        console.log("obj.org_id " + obj.org_id);
        getInit(obj.org_id);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const changeStatus = (obj) => {
    if (isFavorite(obj.org_id)) {
      removeFromFavorites(obj);
    } else {
      addToFavorites(obj);
    }
  };

  // check filter or not 
  const getInit = (orgId) => {
    if (menChecked ==false && womenChecked == false  && familiesChecked == false && socialSercurityChecked == false && plus60Checked == false && substanceFreeChecked == false && hivPositiveChecked == false && survivorDomisticViolenceChecked == false
      && photoIDChecked == false  && substanceUseChecked == false && residentVirginiaChecked == false && pregnantChecked == false
      && mentalIllnessChecked == false && medicaidChecked == false && medicareChecked == false
      && seriousMentalIllnessChecked == false  && chronicIllnessChecked == false && traumaChecked == false && homelessChecked == false && deafHearingImpairedChecked == false  && intellectualDisabilityChecked == false && returningCitizensChecked == false
        && checked == false) {
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
          if (orgId <= 0) {
            orgId = response.data[0].org_id;
          }
          getOrganizations(orgId);
          getFavOrganizations();
        }
      });
    } else {
      console.log("get filter page")
      let listKeyWord = [];

      // housing
      if(menChecked) {
        listKeyWord.push("Men");
      }
      if(womenChecked) {
        listKeyWord.push("Women");
      }
      if(familiesChecked) {
        listKeyWord.push("Families");
      }
      if(socialSercurityChecked) {
        listKeyWord.push("Social Security");
      }
      if(plus60Checked) {
        listKeyWord.push("60+");
      }
      if(substanceFreeChecked) {
        listKeyWord.push("Substance free");
      }
      if(hivPositiveChecked) {
        listKeyWord.push("HIV positive");
      }
      if(survivorDomisticViolenceChecked) {
        listKeyWord.push("Survivor of Domestic Violence");
      }

      // health
      if(photoIDChecked) {
        listKeyWord.push("Photo ID");
      }
      if(substanceUseChecked) {
        listKeyWord.push("Substance use");
      }
      if(residentVirginiaChecked) {
        listKeyWord.push("Resident of Virginia");
      }
      if(pregnantChecked) {
        listKeyWord.push("Pregnant");
      }

      // substance use: some varibles are reused from other pages
      if(mentalIllnessChecked) {
        listKeyWord.push("Mental illness");
      }
      if(medicaidChecked) {
        listKeyWord.push("Medicaid");
      }
      if(medicareChecked) {
        listKeyWord.push("Medicare");
      }

      // mental page: some varibles are reused from other pages
      if(seriousMentalIllnessChecked) {
        listKeyWord.push("Serious Mental Illness");
      }
      if(chronicIllnessChecked) {
        listKeyWord.push("Chronic Illness");
      }
      if(traumaChecked) {
        listKeyWord.push("Trauma");
      }
      if(homelessChecked) {
        listKeyWord.push("Homeless");
      }
      if(deafHearingImpairedChecked) {
        listKeyWord.push("Deaf/hearing impaired");
      }
      if(intellectualDisabilityChecked) {
        listKeyWord.push("Intellectual disability");
      }
      if(returningCitizensChecked) {
        listKeyWord.push("Returning citizens");
      }

      console.log(listKeyWord)

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
          if (orgId <= 0) {
            orgId = response.data[0].org_id;
          }
          getOrganizations(orgId);
          getFavOrganizations();
        }
      });
    }
  };
  useEffect(() => {
    document.title = tittlePage;  
    Axios.get( serverDomain+"/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginUser(response.data.user[0].username);
        setData(response.data);
        getInit(0);
      } else {
        history.push("/login");
      }
    });
  }, [offset,checked,
    menChecked,womenChecked,familiesChecked,socialSercurityChecked,plus60Checked,substanceFreeChecked,hivPositiveChecked,survivorDomisticViolenceChecked,
    photoIDChecked,substanceUseChecked,residentVirginiaChecked,pregnantChecked,
    mentalIllnessChecked,medicaidChecked,medicareChecked,
    seriousMentalIllnessChecked,chronicIllnessChecked,traumaChecked,homelessChecked,deafHearingImpairedChecked,intellectualDisabilityChecked,returningCitizensChecked
  ]);

  return (
    <div className="container home">
      <CommonNav />
      <CommonOrgPageHeader tittlePage= {tittlePage}/>
      <div className="org_filter">
        <main>
          <Button
            onClick={() => setButtonPoup(true)}
            className="fullWidth"
            variant="primary"
          >
            Filter Organizations
          </Button>
        </main>

        {/* BEGIN housing page  */}
        {pageName == "housing" &&
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
              Men
            </Button>
            <Button
                bsPrefix="super-btn"
                value={womenChecked}
                onClick={(e) => {
                  handleFilterHousingWomenKeyWord();
                }}
                className={classNames({
                  keyWords: true,
                  btnFilterCustom: checkHousingWomenKeyWord()
                })}
              >
                Women
              </Button>
              <Button
                bsPrefix="super-btn"
                value={familiesChecked}
                onClick={(e) => {
                  handleFilterHousingFamiliesKeyWord();
                }}
                className={classNames({
                  keyWords: true,
                  btnFilterCustom: checkHousingFamiliesKeyWord()
                })}
              >
                Families 
              </Button>
              <Button
                bsPrefix="super-btn"
                value={socialSercurityChecked}
                onClick={(e) => {
                  handleFilterHousingSocialSercurityKeyWord();
                }}
                className={classNames({
                  keyWords: true,
                  btnFilterCustom: checkHousingSocialSercurityKeyWord()
                })}
              >
                Social Security  
              </Button>
              <Button
                bsPrefix="super-btn"
                value={plus60Checked}
                onClick={(e) => {
                  handleFilterHousingPlus60KeyWord();
                }}
                className={classNames({
                  keyWords: true,
                  btnFilterCustom: checkHousingPlus60KeyWord()
                })}
              >
                60+ 
              </Button>
              <Button
                bsPrefix="super-btn"
                value={substanceFreeChecked}
                onClick={(e) => {
                  handleFilterHousingSubstanceFreeKeyWord();
                }}
                className={classNames({
                  keyWords: true,
                  btnFilterCustom: checkHousingSubstanceFreeKeyWord()
                })}
              >
                Substance free 
              </Button>
              <Button
                bsPrefix="super-btn"
                value={hivPositiveChecked}
                onClick={(e) => {
                  handleFilterHousingHIVPositiveKeyWord();
                }}
                className={classNames({
                  keyWords: true,
                  btnFilterCustom: checkHousingHIVPositiveKeyWord()
                })}
              >
                HIV positive 
              </Button>

              <Button
                bsPrefix="super-btn"
                value={survivorDomisticViolenceChecked}
                onClick={(e) => {
                  handleFilterHousingSurvivorDomisticViolenceKeyWord();
                }}
                className={classNames({
                  keyWords: true,
                  btnFilterCustom: checkHousingSurvivorDomisticViolenceKeyWord()
                })}
              >
                Survivor of Domestic Violence 
              </Button>

          </Popup>          
        } 
        {/* END housing page  */}

        {/* BEGIN health page  */}
        {pageName == "health" &&
          <Popup trigger={buttonPoup} setTrigger={setButtonPoup}>
            {/* <span>Filter by: </span> */}
            <br></br>
            <Button
              bsPrefix="super-btn"
              value={photoIDChecked}
              onClick={(e) => {
                handleFilterHealthPhotoIdKeyWord();
              }}
              className={classNames({
                keyWords: true,
                btnFilterCustom: checkHealthPhotoIDKeyWord()
              })}
            >
              Photo ID 
            </Button>
            <Button
                bsPrefix="super-btn"
                value={substanceUseChecked}
                onClick={(e) => {
                  handleFilterHealthSubstanceUseKeyWord();
                }}
                className={classNames({
                  keyWords: true,
                  btnFilterCustom: checkHealthSubstanceUseKeyWord()
                })}
              >
                Substance use 
              </Button>
              <Button
                bsPrefix="super-btn"
                value={residentVirginiaChecked}
                onClick={(e) => {
                  handleFilterHealthResidentVirginiaKeyWord();
                }}
                className={classNames({
                  keyWords: true,
                  btnFilterCustom: checkHealthResidentVirginiaKeyWord()
                })}
              >
                Resident of Virginia  
              </Button>
              <Button
                bsPrefix="super-btn"
                value={pregnantChecked}
                onClick={(e) => {
                  handleFilterHealthPregnantKeyWord();
                }}
                className={classNames({
                  keyWords: true,
                  btnFilterCustom: checkHealthPregnantKeyWord()
                })}
              >
                 Pregnant 
              </Button>
          </Popup>          
        } 
        {/* END health page  */}

         {/* BEGIN substanceUse page  */}
         {pageName == "substanceUse" &&
          <Popup trigger={buttonPoup} setTrigger={setButtonPoup}>
          {/* <span>Filter by: </span> */}
          <br></br>
          <Button
              bsPrefix="super-btn"
              value={substanceUseChecked}
              onClick={(e) => {
                handleFilterSubstanceUseSubstanceUseKeyWord();
              }}
              className={classNames({
                keyWords: true,
                btnFilterCustom: checkSubstanceUseSubstanceUseKeyWord()
              })}
            >
              Substance use 
            </Button>
            <Button
            bsPrefix="super-btn"
            value={mentalIllnessChecked}
            onClick={(e) => {
              handleFilterSubstanceUseMentalIllnessKeyWord();
            }}
            className={classNames({
              keyWords: true,
              btnFilterCustom: checkSubstanceUseMentalIllnessKeyWord()
            })}
          >
            Mental illness 
          </Button>
            <Button
              bsPrefix="super-btn"
              value={medicaidChecked}
              onClick={(e) => {
                handleFilterSubstanceUseMedicaidKeyWord();
              }}
              className={classNames({
                keyWords: true,
                btnFilterCustom: checkSubstanceUseMedicaidKeyWord()
              })}
            >
              Medicaid
            </Button>
            <Button
              bsPrefix="super-btn"
              value={medicareChecked}
              onClick={(e) => {
                handleFilterSubstanceUseMedicareKeyWord();
              }}
              className={classNames({
                keyWords: true,
                btnFilterCustom: checkSubstanceUseMedicareKeyWord()
              })}
            >
               Medicare 
            </Button>
        </Popup>  
        } 
        {/* END substanceUse page  */}

        {/* BEGIN mentalHealth page  */}
        {pageName == "mentalHealth" &&
          <Popup trigger={buttonPoup} setTrigger={setButtonPoup}>
            {/* <span>Filter by: </span> */}
            <br></br>
            <Button
              bsPrefix="super-btn"
              value={medicaidChecked}
              onClick={(e) => {
                handleFilterMentalMedicaidKeyWord();
              }}
              className={classNames({
                keyWords: true,
                btnFilterCustom: checkMentalMedicaidKeyWord()
              })}
            >
              Medicaid
            </Button>
            <Button
                bsPrefix="super-btn"
                value={medicareChecked}
                onClick={(e) => {
                  handleFilterMentalMedicareKeyWord();
                }}
                className={classNames({
                  keyWords: true,
                  btnFilterCustom: checkMentalMedicareKeyWord()
                })}
              >
                Medicare
              </Button>
              <Button
                bsPrefix="super-btn"
                value={seriousMentalIllnessChecked}
                onClick={(e) => {
                  handleFilterMentalSeriousMentalIllnessdKeyWord();
                }}
                className={classNames({
                  keyWords: true,
                  btnFilterCustom: checkMentalSeriousMentalIllnessKeyWord()
                })}
              >
                Serious Mental Illness 
              </Button>
              <Button
                bsPrefix="super-btn"
                value={chronicIllnessChecked}
                onClick={(e) => {
                  handleFilterMentalChronicIllnessKeyWord();
                }}
                className={classNames({
                  keyWords: true,
                  btnFilterCustom: checkMentalChronicIllnessKeyWord()
                })}
              >
                Chronic Illness 
              </Button>
              <Button
                bsPrefix="super-btn"
                value={traumaChecked}
                onClick={(e) => {
                  handleFilterMentalTraumaKeyWord();
                }}
                className={classNames({
                  keyWords: true,
                  btnFilterCustom: checkMentalTraumaKeyWord()
                })}
              >
                Trauma
              </Button>
              <Button
                bsPrefix="super-btn"
                value={survivorDomisticViolenceChecked}
                onClick={(e) => {
                  handleFilterMentalSurvivorDomisticViolenceKeyWord();
                }}
                className={classNames({
                  keyWords: true,
                  btnFilterCustom: checkMentalSurvivorDomisticViolenceKeyWord()
                })}
              >
             Survivor of Domestic Violence 
              </Button>
              <Button
                bsPrefix="super-btn"
                value={homelessChecked}
                onClick={(e) => {
                  handleFilterMentalHomelessKeyWord();
                }}
                className={classNames({
                  keyWords: true,
                  btnFilterCustom: checkMentalHomelessKeyWord()
                })}
              >
                Homeless
              </Button>

              <Button
                bsPrefix="super-btn"
                value={deafHearingImpairedChecked}
                onClick={(e) => {
                  handleFilterMentalDeafHearingImpairedKeyWord();
                }}
                className={classNames({
                  keyWords: true,
                  btnFilterCustom: checkMentalDeafHearingImpairedKeyWord()
                })}
              >
               Deaf/hearing impaired 
              </Button>
              <Button
                bsPrefix="super-btn"
                value={intellectualDisabilityChecked}
                onClick={(e) => {
                  handleFilterMentalIntellectualDisabilityKeyWord();
                }}
                className={classNames({
                  keyWords: true,
                  btnFilterCustom: checkMentalIntellectualDisabilityKeyWord()
                })}
              >
               Intellectual disability 
              </Button>

              <Button
                bsPrefix="super-btn"
                value={returningCitizensChecked}
                onClick={(e) => {
                  handleFilterMentalReturningCitizensKeyWord();
                }}
                className={classNames({
                  keyWords: true,
                  btnFilterCustom: checkMentalReturningCitizensKeyWord()
                })}
              >
                Returning citizens 
              </Button>

          </Popup>          
        } 
        {/* END mentalHealth page  */}

        {(pageName == "basicNeeds" || pageName == "employment" || pageName == "hotline" || pageName == "information" || pageName == "universal") &&
          <Popup trigger={buttonPoup} setTrigger={setButtonPoup}>
            {/* <span>Filter by: </span>
            <br></br>
            <Checkbox
              label="Photo ID"
              value={checked}
              onChange={handleChangePoupFilterByPhotoID}
            /> */}
          <Button
            bsPrefix="super-btn"
            value={checked}
            onClick={(e) => {
              handleChangePoupFilterByPhotoID();
            }}
            className={classNames({
              keyWords: true,
              btnFilterCustom: checkPhotoIDKeyWord()
            })}
          >
            Photo ID
          </Button>
          </Popup>          
        } 

      </div>

      {totalOrg > 0 ? (
        
        <div className="homeDisplay">
          <div className="disp1">
            <h5>Total Organizations: {totalOrg}</h5>

            {orgData.map(function(org) {
              if (loggedInUser.length == 0) {
                history.push("/login");
              }
              return (
                <div
                  onClick={() => getOrganizations(org.org_id)}
                  className={classNames({
                    ldisp: true,
                    active: checkActive(org.org_id),
                  })}
                >
                  <div className="ttl">{org.name}</div>
                  <div className="subttl">{org.type}</div>
                </div>
              );
            })}
          </div>
          <div className="disp2">
            <div className="root">
              <span className="child">
                <FontAwesomeIcon
                  onClick={() => changeStatus(unit_org)}
                  icon={isFavorite(unit_org.org_id) ? fasB : farB}
                />
              </span>
            </div>
            <div className="section">
              <div className="secttl">Organization</div>
              <div className="secsubttl">{unit_org.name}</div>
            </div>
            <div className="section">
              <div className="secttl">Address</div>
              <div className="secsubttl">{unit_org.address}</div>
            </div>
            <div className="section">
              <div className="secttl">Zip Code</div>
              <div className="secsubttl">{unit_org.zip_code}</div>
            </div>
            <div className="section">
              <div className="secttl">Type</div>
              <div className="secsubttl">{unit_org.type}</div>
            </div>
            <div className="section">
              <div className="secttl">Description</div>
              <div className="secsubttl">{unit_org.description}</div>
            </div>
            <div className="section">
              <div className="secttl">Services</div>
              <div className="secsubttl">{unit_org.services}</div>
            </div>
            <div className="section">
              <div className="secttl">Criteria</div>
              <div className="secsubttl">{unit_org.criteria}</div>
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
  );
}

export default OrgPageTemplate;
