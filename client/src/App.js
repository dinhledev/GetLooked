import React, {useState, useEffect, useContext,createContext} from "react";
import "./App.css";
import Login from "./components/Login";
import Registration from "./components/Registration";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import Profile from "./components/Profile";
import About from "./components/About";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Axios from "axios";
import Housing from "./components/Housing";
import BasicNeeds from "./components/BasicNeeds";
import Employment from "./components/Employment";
import Favorites from "./components/Favorites";
import EditProfile from "./components/EditProfile";
import Health from "./components/Health";
import Hotline from "./components/Hotline";
import Information from "./components/Information";
import MentalHealth from "./components/MentalHealth";
import SubstanceUse from "./components/SubstanceUse";
import Universal from "./components/Universal";
import MyPlans from "./components/MyPlans";
import EmploymentPlan from "./components/EmploymentPlan";
import HousingPlan from "./components/HousingPlan";
import MentalHealthPlan from "./components/MentalHealthPlan";
import SubstanceUsePlan from "./components/SubstanceUsePlan";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

 const GlobalConfigContext = createContext();
 export const useGlobalConfigContext = () => useContext(GlobalConfigContext);


function App(){
  const [loggedInUser, setLoginUser] = useState("");
  const [data, setData] = useState("")
  Axios.defaults.withCredentials = true;

  const globalConfig = {
    "serverDomain": "http://localhost:3001",
    "serverDomainWithDash": "http://localhost:3001/"
  }

  useEffect(()=> {
    Axios.get(globalConfig["serverDomain"]+"/login").then((response) => {
       if (response.data.loggedIn == true){
          setLoginUser(response.data.user[0].username)
          setData(response.data)
       }
    })
  }, []);
  
  return(
    <GlobalConfigContext.Provider value={globalConfig}>
    <Router>
      <div className="App">
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Registration}/> 
        <Route path="/forgotpassword" component={ForgotPassword}/> 
        <Route path="/about" component={About}/>
        <Route path="/home" component={Home}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/housing" component={Housing}/>
        <Route path="/basicNeeds" component={BasicNeeds}/>
        <Route path="/employment" component={Employment}/>
        <Route path="/favorites" component={Favorites}/>
        <Route path="/editProfile" component={EditProfile}/>
        <Route path="/health" component={Health}/>
        <Route path="/hotline" component={Hotline}/>
        <Route path="/information" component={Information}/>
        <Route path="/mentalHealth" component={MentalHealth}/>
        <Route path="/substanceUse" component={SubstanceUse}/>
        <Route path="/universal" component={Universal}/>
        <Route path="/myPlans" component={MyPlans}/>
        <Route path="/housingPlan" component={HousingPlan}/>
        <Route path="/employmentPlan" component={EmploymentPlan}/>
        <Route path="/mentalHealthPlan" component={MentalHealthPlan}/>
        <Route path="/substanceUsePlan" component={SubstanceUsePlan}/>
        
      </div>
    </Router>
    </GlobalConfigContext.Provider>
  );
}
 
export default App;







