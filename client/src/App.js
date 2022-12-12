import React, {useState, useEffect, useContext,createContext} from "react";
import "./App.css";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Axios from "axios";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Home from "./components/Home";
import About from "./components/About";
import Athletes from "./components/Athletes";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

 const GlobalConfigContext = createContext();
 export const useGlobalConfigContext = () => useContext(GlobalConfigContext);


function App(){
  const [loggedInUser, setLoginUser] = useState("");
  const [data, setData] = useState("")
  Axios.defaults.withCredentials = true;

  const domain = window.location.hostname;
  var domainServer = "";
  if(domain == "localhost") {
    domainServer = "http://localhost:3001"
  } else {
    domainServer = "https://server.getlooked.com"
  }
  console.log(domainServer);

  const globalConfig = {
    "serverDomain": domainServer,
    "s3BucketImageNameHttpWithDash": "https://s3.amazonaws.com/getlooked.com.images/"
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
        <Route exact path='/' component={Login}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Registration}/> 
        <Route path="/about" component={About}/>
        <Route path="/home" component={Home}/>
        <Route path="/athletes" component={Athletes}/>
      </div>
    </Router>
    </GlobalConfigContext.Provider>
  );
}
 
export default App;







