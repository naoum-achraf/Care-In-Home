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


class Main extends React.Component{

  constructor(props){
    super(props);
    this.state=this.initialState;
    this.voitureChange = this.voitureChange.bind(this);
    this.submitAgent = this.submitAgent.bind(this);
    this.state = {
        Agents : [""],
        show: false
    };
}

initialState = {
  username:'',
  email:'',
  age:'',
  hopitale:'',
  password:'',
  role:''
} 

resetVoiture = () => {
  this.setState(() => this.initialState
  );
}
  
submitAgent = event => { 
  event.preventDefault();
  const agent={
          username:this.state.username,
          email:this.state.email,
          age:this.state.age,
          hopitale:this.state.hopitale,
          password:this.state.password,
          role:["agent"]
  };      
 
axios.post("http://localhost:8080/api/auth/signup", agent)
      .then(response => {
      if (response.data != null) {
              this.setState({ show: true, method: "post" });
              this.setState(this.initialState);
              window.location.href = '/gestionAgent';
             
              
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
    const { username, email, age,hopitale, password } = this.state;
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
            <p>Welcome to gestion des agents</p>
          </div>
        </div>

        <div className="Form">

        
            <Form onReset={this.resetVoiture} onSubmit={this.submitAgent} id="VoitureFormId"> 
           
         <Form.Row> 
            <Form.Group as={Col} controlId="formGridMarque"> 
               <Form.Label> Username </Form.Label> 
               <Form.Control required name="username" type="text" autoComplete="off" value={username} onChange={this.voitureChange}  placeholder= "Entrez Username"/> 
            </Form.Group> 

            <Form.Group as={Col} controlId="formGridModele"> 
                    <Form.Label> Email </Form.Label> 
                    <Form.Control required  name="email" type="text" value={email} autoComplete="off" onChange={this.voitureChange} placeholder= "Entrez Email"/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCouleur"> 
                    <Form.Label> Age </Form.Label> 
                    <Form.Control required value={age} name="age" type="text"  autoComplete="off" onChange={this.voitureChange}  placeholder= "Entrez age"/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCouleur"> 
                    <Form.Label> hopitale </Form.Label> 
                    <Form.Control required value={hopitale} name="hopitale" type="text"  autoComplete="off" onChange={this.voitureChange}  placeholder= "Entrez hopitale"/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridImmatricule"> 
               <Form.Label> Password </Form.Label> 
               <Form.Control required value={password} name="password"  type="password"  autoComplete="off" onChange={this.voitureChange} placeholder= "Entrez password"/> 
            </Form.Group> 
            
            </Form.Row> 

                 <div style={{"textAlign":"right"}}>
                      <Button size="sm" variant="success" type="submit"><FontAwesomeIcon icon={faSave} /> Submit </Button> <i>&nbsp;</i>
                      <Button size="sm" variant="info" type="reset"><FontAwesomeIcon icon={faUndo} /> Reset </Button>
                      </div>
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
