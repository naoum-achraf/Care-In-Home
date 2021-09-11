import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import { useState } from "react";
import Login from "./component/login.component";
import Register from "./component/register.component";
import Home from "./component/home.component";
import Profile from "./component/profile.component";
import BoardPatient from "./PatientComponents/DashPatient/main/Main";
import BoardModerator from "./AgentComponents/DashAgent/main/Main";
import BoardAdmin from "./AdminComponents/DashAdmin/main/Main";
import GestionAgent from "./AdminComponents/GestionAdmin/main/Main";
import AddAgent from "./AdminComponents/AddAgent/main/Main";
import UpdateAgent from "./AdminComponents/UpdateAgent/main/Main";
import Médicament from "./PatientComponents/GestionPatient/main/Main";
import progress from "./PatientComponents/Progress/main/Main";
import Test from "./PatientComponents/Test/main/Main";
import crudPatient from "./AgentComponents/GestionPatient/main/Main";
import Form from "./AgentComponents/GestionPatient/main/Form";
import UpdatePatient from "./AgentComponents/UpdatePatient/main/Main";
import Suivre from "./AgentComponents/Progress/main/Main";
import Messagerie from "./AgentComponents/Messagerie/main/Main";
import MessagerieP from "./PatientComponents/Messagerie/main/Main";
import MessagerieA from "./AdminComponents/Messagerie/main/Main";
import ProfileAdmin from "./AdminComponents/Profil/main/Main";
import ProfilePatient from "./PatientComponents/Profil/main/Main";
import ProfileAgent from "./AgentComponents/Profil/main/Main";
import { ProtectedAdmin } from "./protectedAdmin.route";
import { ProtectedPatient } from "./protectedPatient.route";
import { ProtectedAgent } from "./protectedAgent.route";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      showPatientBoard: false,
      currentUser: undefined,
    };
  }
  
  

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_AGENT"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showPatientBoard: user.roles.includes("ROLE_PATIENT"),
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      showPatientBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard, showPatientBoard } = this.state;
  
    return (
      <div>
        


        
        <div className="container1">
          <Switch>
            <Route exact path={["/"]} component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
            <ProtectedPatient path="/patient" component={BoardPatient} />
            <ProtectedAgent path="/agent" component={BoardModerator} />
            <ProtectedAdmin path="/admin" component={BoardAdmin} />
            <ProtectedAdmin path="/gestionagent" component={GestionAgent} />
            <ProtectedAdmin path="/addAg" component={AddAgent} />
            <ProtectedAdmin path="/editAgent/:id" component={UpdateAgent} />
            <ProtectedPatient path="/médicament" component={Médicament} />
            <ProtectedPatient path="/progress" component={progress} />
            <ProtectedPatient path="/test" component={Test} />
            <ProtectedAgent path="/crudPatient" component={crudPatient} />
            <ProtectedAgent path="/addPatient" component={Form} />
            <ProtectedAgent path="/editPatient/:id" component={UpdatePatient} />
            <ProtectedAgent path="/suivre" component={Suivre} />
            <ProtectedAgent path="/messagerie" component={Messagerie} />
            <ProtectedPatient path="/messagerieP" component={MessagerieP} />
            <ProtectedAdmin path="/messageA" component={MessagerieA} />
            <ProtectedAdmin path="/profilAdmin" component={ProfileAdmin} />
            <ProtectedAgent path="/profilAgent" component={ProfileAgent} />
            <ProtectedAgent path="/profilPatient" component={ProfilePatient} />
            
          </Switch>
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */ }
      </div>
    );
  }
}

export default App;