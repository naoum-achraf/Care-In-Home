import "./Main.css";
import hello from "../../assets/hello.svg";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar"
import AuthService from "../../../services/auth.service";
import axios from 'axios';
import {Card, Form, Button,Col} from 'react-bootstrap'; 
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAd, faEdit, faList, faTrash} from '@fortawesome/free-solid-svg-icons';
import React from "react";
import { Link } from "react-router-dom";
import {faPlusSquare, faSave, faUndo} from '@fortawesome/free-solid-svg-icons';
import {CircleProgress} from 'react-gradient-progress'

class Main extends React.Component{

  constructor(props){
    super(props);
    this.state=this.initialState;
    this.voitureChange = this.voitureChange.bind(this);
    this.state = {
      progress1:'',
      progress2:''
    };
}

initialState = {
  progress1:'',
  progress2:''
} 

componentDidMount() {
 
          axios.get("http://localhost:8080/api/test/Médicament/"+AuthService.getCurrentUser().id)
          .then(Response => Response.data)
          .then((data) => {
            let agent =data;
            this.setState({progress1:agent[0],progress2:agent[1]});            
          })

  
}


submitFirst(){
  axios.put("http://localhost:8080/api/test/Médicament/add1/"+AuthService.getCurrentUser().id)
      .then(response => {
      if (response.data != null) {
              alert("Update avec succes")
              window.location.reload(false);

      }else{
        alert("wrong ")
      }
});
}  

submitSec(){
  axios.put("http://localhost:8080/api/test/Médicament/add2/"+AuthService.getCurrentUser().id)
      .then(response => {
      if (response.data != null) {
              alert("Update avec succes")
              window.location.reload(false);

      }else{
        alert("wrong ")
      }
});
} 




voitureChange =event => { 
  this.setState ( { 
          [event.target.name]:event.target.value } ); 

}   

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
            <p>Please déclarer votre avancement des médicaments</p>
          </div>
        </div>

        <div className="charts">
          <div className="charts__right">
            <div className="charts__right__title">
              <div>
                <h1>Chloroquine</h1>
                <p>Goal : 7 jours<br/> Reste : {7 - this.state.progress1} jours </p>
              </div>
              <i className="fa fa-usd" aria-hidden="true"></i>
            </div>

            <div className="charts__right__cards">
              <div className="card1">
                        <CircleProgress percentage={Math.trunc(this.state.progress1*100/7)} width={150} fontSize={35} strokeWidth={5} primaryColor={["#11FFBD", "#c42424"]} secondaryColor="#f0f0f0" />
              </div>
              {(() => {
                        if (this.state.progress1 == 7) {
                          return (
                            <Button className="btn btn-dark btn-circle btn-xl" size="lg" variant="primary"  disabled onClick={this.submitFirst}><FontAwesomeIcon icon={faPlusSquare}/>  </Button>
                            )
                        } else {
                          return (
                            <Button className="btn btn-dark btn-circle btn-xl" size="lg" variant="primary" onClick={this.submitFirst}><FontAwesomeIcon icon={faPlusSquare}/>  </Button>
                          )
                        } 
                      })()}
            </div>
          </div>
          <div className="charts__left">
            <div className="charts__left__title">
              <div>
                <h1>Azithromycine</h1>
                <p>Goal : 7 jours<br/> Reste : {7 - this.state.progress2} jours </p>
              </div>
              <i className="fa fa-usd" aria-hidden="true"></i>
            </div>

            <div className="charts__right__cards">
              <div className="card1">
              <CircleProgress percentage={Math.trunc(this.state.progress2*100/7)} width={150} fontSize={35} strokeWidth={5} primaryColor={["#11FFBD", "#c42424"]} secondaryColor="#f0f0f0"/>
              </div>

              {(() => {
                        if (this.state.progress2 == 7) {
                          return (
                            <Button className="btn btn-dark btn-circle btn-xl" size="lg" variant="primary"  disabled onClick={this.submitSec}><FontAwesomeIcon icon={faPlusSquare}/>  </Button>
                            )
                        } else {
                          return (
                            <Button className="btn btn-dark btn-circle btn-xl" size="lg" variant="primary" onClick={this.submitSec}><FontAwesomeIcon icon={faPlusSquare}/>  </Button>
                          )
                        } 
                      })()}
              

            </div>
          </div>
        </div>
        {(() => {
                      if (this.state.progress2 == 7 && this.state.progress1 == 7 ) {
                          return (
                            <div className="last">
                                  <h2>Veuillez faire le test et le déclarer le plutot possible</h2>
                            </div>
                            )
                        }
                      })()}
        
      </div>
      
    </main>

                  <Sidebar />
               
    
   </div>
    
    
  );
                      }
};

export default Main;