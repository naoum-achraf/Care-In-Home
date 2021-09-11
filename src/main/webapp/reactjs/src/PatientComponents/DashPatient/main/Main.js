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
    this.state=this.initialState;
    this.state = {
      username:'',
      email:'',
      age:'',
      hopitale:'',
      password:''
    };
}


initialState = {
  username:'',
  email:'',
  age:'',
  hopitale:'',
  password:''
}   

  
componentDidMount(){
  axios.get("http://localhost:8080/api/test/Respo/"+AuthService.getCurrentUser().id)
  .then(Response => Response.data)
  .then((data) => {
    let agent = data[0]
      this.setState({username:agent.username,email:agent.email,age:agent.age,hopitale:agent.hopitale,password:agent.password});
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
            <p>Welcome to your dashboard</p>
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
                <h1>Infos Patient </h1>
                <p>{AuthService.getCurrentUser().username}</p>
              </div>
            </div>

            <div className="charts__right__cards">
              <div className="card1">
                <h4>Username</h4>
                <h1>{AuthService.getCurrentUser().username}</h1>
              </div>

              <div className="card2">
                <h3>Age</h3>
                <h1>{AuthService.getCurrentUser().age}</h1>
              </div>

             
            </div>
          </div>
          <div className="charts__left">
            <div className="charts__left__title">
              <div>
                <h1>Infos Agent</h1>
                <p>Maroc</p>
              </div>
            </div>

            <div className="charts__right__cards">
              <div className="card1">
                <h3>Nom</h3>
                <h1>{this.state.username}</h1>
              </div>

              <div className="card2">
                <h4>Hopitale</h4>
                <h4>{this.state.hopitale}</h4>
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
