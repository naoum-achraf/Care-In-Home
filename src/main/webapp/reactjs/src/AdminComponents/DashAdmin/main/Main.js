import "./Main.css";
import { useState } from "react";
import hello from "../../assets/hello.svg";
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
        Négatives:[],
        Patients :[]
    };
}
  
componentDidMount(){
  axios.get("http://localhost:8080/api/test/allAgents")
  .then(Response => Response.data)
  .then((data) => {
      this.setState({Agents: data});
  })

  axios.get("http://localhost:8080/api/test/allNégatives")
  .then(Response => Response.data)
  .then((data) => {
      this.setState({Négatives: data});
  })

  axios.get("http://localhost:8080/api/test/allPatients")
  .then(Response => Response.data)
  .then((data) => {
      this.setState({Patients: data});
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
            <p>Welcome to your admin dashboard</p>
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
                <h1>Statistique Agents </h1>
                <p>Maroc</p>
              </div>
            </div>

            <div className="charts__right__cards">
              <div className="card1">
                <h3>N° Agents</h3>
                <h1>{this.state.Agents.length}</h1>
              </div>

              <div className="card2">
                <h3>N° hopitale</h3>
                <h1>{this.state.Agents.length}</h1>
              </div>

             
            </div>
          </div>
          <div className="charts__left">
            <div className="charts__left__title">
              <div>
                <h1>Statisque Patients</h1>
                <p>Maroc</p>
              </div>
            </div>

            <div className="charts__right__cards">
              <div className="card1">
                <h3>N° Patients</h3>
                <h1>{this.state.Patients.length}</h1>
              </div>

              <div className="card2">
                <h3>N° Négative</h3>
                <h1>{this.state.Négatives.length}</h1>
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
