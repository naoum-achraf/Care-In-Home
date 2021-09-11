import "./Main.css";
import hello from "../../assets/hello.svg";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar"
import AuthService from "../../../services/auth.service";
import axios from 'axios';
import {Card, Form, Button,Col} from 'react-bootstrap'; 
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAd, faEdit, faList, faTrash} from '@fortawesome/free-solid-svg-icons';
import UserService from "../../../services/user.service"; 
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {faPlusSquare, faSave, faUndo} from '@fortawesome/free-solid-svg-icons';
import ButtonGroup from 'react-bootstrap/ButtonGroup'

class Main extends React.Component{

  constructor(props){
    super(props);
    this.state=this.initialState;
    this.voitureChange = this.voitureChange.bind(this);
    this.state = {
      res:''
    };
    
}

initialState = {
  res:'',
}   

resetVoiture = () => {
  this.setState(() => this.state
  );
}

submitFalse(){
  axios.put("http://localhost:8080/api/test/Resultat/F/"+AuthService.getCurrentUser().id)
      .then(response => {
      if (response.data != null) {
              alert("Resultat Négative")
              window.location.reload(false);

      }else{
        alert("wrong ")
      }
});
}  


submitTrue(){
  axios.put("http://localhost:8080/api/test/Resultat/T/"+AuthService.getCurrentUser().id)
      .then(response => {
      if (response.data != null) {
              alert("Resultat Positive")
              window.location.reload(false);
      }else{
        alert("wrong ")
      }
});
} 




voitureChange =event => { 
  this.setState ( { 
          res:event.target.attributes.getNamedItem("data-key").value } ); 

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
            <p>Welcome to Update des agents</p>
          </div>
        </div>

        <div className="Form">

        
            <Form onReset={this.resetVoiture} onSubmit={this.submitAgent} id="VoitureFormId"> 
           
         <Form.Row> 
            <Form.Group as={Col} controlId="formGridMarque"> 
               <Form.Label> Date du test <br/> </Form.Label> 
               <Form.Control required name="Date" type="date" autoComplete="on" placeholder= "Entrez Date"/>
            </Form.Group> 

            <Form.Group as={Col} controlId="formGridModele"> 
            <Form.Label> Résultat du test </Form.Label> <br/>
            <ButtonGroup aria-label="Basic example" onChange={this.voitureChange}>
              <Button variant="success" onClick={this.submitFalse}>Négative</Button>
              <Button variant="danger" onClick={this.submitTrue}>Positive</Button>
            </ButtonGroup>        
            </Form.Group>      
            </Form.Row> 
            </Form>
        </div>
      </div>
    </main>
    <Sidebar />
   </div>
    
    
  );
                      }
};

export default Main;
