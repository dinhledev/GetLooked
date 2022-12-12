import React, { useState, useEffect } from "react";
import "../App.css";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import Select from "../common/Dropdown";
import { useGlobalConfigContext } from "../App";
import CommonNav from "../common/CommonNav";
import AWS from 'aws-sdk'

function Registration() {
  const serverDomain = useGlobalConfigContext()["serverDomain"];

  const history = useHistory();
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [confirmPasswordReg, setConfirmPasswordReg] = useState("");
  const [firsNameReg, setFirsNameReg] = useState("");
  const [lastNameReg, setLastNameReg] = useState("");
  const [dobReg, setDOBReg] = useState("");
  const [heightReg, setHeightReg] = useState(0);
  const [weightReg, setWeightReg] = useState(0);
  const [sportReg, setSportReg] = useState("Football");
  const [positionReg, setPositionReg] = useState("Middle");
  const [aboutReg, setAboutReg] = useState("");
  const [orgNameReg, setOrgNameReg] = useState("");
  const [addressReg, setAddressReg] = useState("");
  const [cityReg, setCityReg] = useState("");
  const [stateReg, setStateReg] = useState("");
  const [isOrgReg, setIsOrgReg] = useState(0);

  const [accountPicReg, setAccountPicReg] = useState("");
  const [progress , setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileInput = (e) => {
      setSelectedFile(e.target.files[0]);
      setAccountPicReg(e.target.files[0].name);
  }
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
  const uploadFile = (file) => {
    console.log(file.name);
    console.log(file.type);
    Axios.post(serverDomain + "/register/generatePreSignedPutUrl", {
      fileName: file.name,
      fileType: file.type
    }).then((response) => {
      console.log(response.data);
      var signedUrl = response.data;
      
      var options = {
        headers: {
          'Content-Type': file.type
        }
      };
      Axios.put(signedUrl, file, options);
    });
  }

  const register = (selectedFile) => {
    if (passwordReg != confirmPasswordReg) {
      setPassMatch("Passwords do not match!");
      return <h4 style={{ color: "red" }}>Passwords do not match</h4>;
    }
    if (emailReg.length == 0) {
      setUserThere("Please input all fieds!");
      return <h4 style={{ color: "red" }}>Email is Required</h4>;
    } else {
      Axios.post(serverDomain + "/register", {
        email: emailReg,
        password: passwordReg,
        first_name: firsNameReg,
        last_name: lastNameReg,
        password: passwordReg,
        date_of_birth: dobReg,
        height: heightReg,
        weight: weightReg,
        sport: sportReg,
        position: positionReg,
        about: aboutReg,
        org_name: orgNameReg,
        street_address: addressReg,
        city: cityReg,
        state: stateReg,
        is_org: isOrgReg,
        acc_pic: accountPicReg,
      }).then((response) => {
        // insert file to image folder here
        console.log("User Registered: ", response);
        uploadFile(selectedFile);
        history.push("/login");
      });
    }
  };
  useEffect(() => {
    document.title = "Sign-Up";
  }, []);
  return (
    <>
      <CommonNav />
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-6">
          <div className="signInHeader">Sign Up Here</div>
            <Form>
              <div className="row">
                <div className="col">
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
                    controlId="formBasicConfirmPassword"
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
                    controlId="formBasicFirstName"
                  >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      onChange={(e) => {
                        setFirsNameReg(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group
                    style={textAlign}
                    className="mb-3"
                    controlId="formBasicLastName"
                  >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      onChange={(e) => {
                        setLastNameReg(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group
                    style={textAlign}
                    className="mb-3"
                    controlId="formBasicDOB"
                  >
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Date of Birth"
                      onChange={(e) => {
                        setDOBReg(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group
                    style={textAlign}
                    className="mb-3"
                    controlId="formBasicHeight"
                  >
                    <Form.Label>Heigth</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Height"
                      onChange={(e) => {
                        setHeightReg(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group
                    style={textAlign}
                    className="mb-3"
                    controlId="formBasicWeight"
                  >
                    <Form.Label>Weight</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Weight"
                      onChange={(e) => {
                        setWeightReg(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload your picture</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={handleFileInput}
                    />
                  </Form.Group>
                </div>
                <div className="col">
                  <Form.Group
                    style={textAlign}
                    className="mb-3"
                    controlId="formBasicSport"
                  >
                    <Form.Label>Sport</Form.Label>
                    <Form.Control as="select" onChange = {(e) => setSportReg(e.target.value)}>
                      <option value="Football">Football</option>
                      <option value="Basketball">Basketball</option>
                      <option value="Soccer">Soccer</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group
                    style={textAlign}
                    className="mb-3"
                    controlId="formBasicPosition"
                  >
                    <Form.Label>Position</Form.Label>
                    <Form.Control as="select" onChange = {(e) => setPositionReg(e.target.value)}>
                      <option value="Middle">Middle</option>
                      <option value="Forward">Forward</option>
                      <option value="Gaurd">Gaurd</option>
                      <option value="Freestyle">Freestyle</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group
                    style={textAlign}
                    className="mb-3"
                    controlId="formBasicAbout"
                  >
                    <Form.Label>About</Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      placeholder="About"
                      onChange={(e) => {
                        setAboutReg(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group
                    style={textAlign}
                    className="mb-3"
                    controlId="formBasicOrgName"
                  >
                    <Form.Label>Org Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Org Name"
                      onChange={(e) => {
                        setOrgNameReg(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group
                    style={textAlign}
                    className="mb-3"
                    controlId="formBasicStreetAddress"
                  >
                    <Form.Label>Street Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Street Address"
                      onChange={(e) => {
                        setAddressReg(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group
                    style={textAlign}
                    className="mb-3"
                    controlId="formBasicCity"
                  >
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="City"
                      onChange={(e) => {
                        setCityReg(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group
                    style={textAlign}
                    className="mb-3"
                    controlId="formBasicState"
                  >
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="State"
                      onChange={(e) => {
                        setStateReg(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group
                    style={textAlign}
                    className="mb-3"
                    controlId="formBasicIsOrg"
                  >
                    <Form.Label>Is Org</Form.Label>
                    <Form.Check
                      aria-label="option 1"
                      onClick={(e) => {
                        setIsOrgReg((e.target.value = "on" ? 1 : 0));
                      }}
                    />
                  </Form.Group>
                </div>
              </div>
              <Button className="fullWidth" variant="primary"  onClick={() => register(selectedFile)}>
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
        </div>  
      </div>
      <div class="mt-5 p-4 bg-dark text-white text-center">
        <p>GetLooked © 2022</p>
      </div>
    </>
  );
}
export default Registration;
