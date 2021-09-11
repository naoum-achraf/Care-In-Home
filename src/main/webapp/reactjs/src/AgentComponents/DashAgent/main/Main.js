import "./Main.css";
import { useState } from "react";
import hello from "../../assets/medical-mask.svg";
import Chart from "../charts/Chart";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar"
import AuthService from "../../../services/auth.service";
import React from "react";
import axios from 'axios';




class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        Agents : [],
        Nbr :[],
        Négative: [],
        Att : []

    };
}
  
componentDidMount(){
  axios.get("http://localhost:8080/api/test/allPatients/"+AuthService.getCurrentUser().id)
  .then(Response => Response.data)
  .then((data) => {
      this.setState({Agents: data});
  })

  axios.get("http://localhost:8080/api/test/encours/"+AuthService.getCurrentUser().id)
  .then(Response => Response.data)
  .then((data) => {
      this.setState({Nbr: data});
  })

  axios.get("http://localhost:8080/api/test/négative/"+AuthService.getCurrentUser().id)
  .then(Response => Response.data)
  .then((data) => {
      this.setState({Négative: data});
  })

  axios.get("http://localhost:8080/api/test/enAttent/"+AuthService.getCurrentUser().id)
  .then(Response => Response.data)
  .then((data) => {
      this.setState({Att: data});
  })
};


render(){
  return (
    
    <div className="container2">
    <Navbar/>
    <main>
      <div className="main__container ">
        {/* <!-- MAIN TITLE STARTS HERE --> */}

        <div className="main__title">
          
          <img src={hello} alt="hello" />
          <div className="main__greeting">
            <h1>Hello {AuthService.getCurrentUser().username}</h1>
            <p>Welcome to your Agent dashboard</p>
          </div>
        </div>

        {/* <!-- MAIN TITLE ENDS HERE --> */}

        {/* <!-- MAIN CARDS STARTS HERE --> */}
        
        
        {/* <!-- MAIN CARDS ENDS HERE --> */}

        {/* <!-- CHARTS STARTS HERE --> */}
        <div className="charts">
          <div className="charts__right">
            <div className="charts__right__title">
              <div>
                <h1>Infos Patients </h1>
                <p>{AuthService.getCurrentUser().username}</p>
              </div>
            </div>

            <div className="charts__right__cards">
              <div className="card1">
                <h4>N° patients</h4>
                <h1>{this.state.Agents.length}</h1>
              </div>

              <div className="card2">
                <h5>Traitement en cours</h5>
                <h1>{this.state.Nbr.length}</h1>
              </div>

             
            </div>
          </div>
          <div className="charts__left">
            <div className="charts__left__title">
              <div>
                <h1>Test Final</h1>
                <p>Maroc</p>
              </div>
            </div>

            <div className="charts__right__cards">
              <div className="card1">
                <h4>Négative</h4>
                <h1>{this.state.Négative.length}</h1>
              </div>

              <div className="card2">
                <h4>En attentes</h4>
                <h1>{this.state.Att.length}</h1>
              </div>

            </div>
          </div>
        </div>
        {/* <!-- CHARTS ENDS HERE --> */}
      </div>
    </main>
    <Sidebar/>
   </div>
    
    
  );
}
};

export default Main;
