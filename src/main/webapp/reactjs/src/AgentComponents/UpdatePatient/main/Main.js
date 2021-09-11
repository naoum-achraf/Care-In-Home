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
import React from "react";
import { Link } from "react-router-dom";
import {faPlusSquare, faSave, faUndo} from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";



class Main extends React.Component{

  constructor(props){
    super(props);
    this.state=this.initialState;
    this.voitureChange = this.voitureChange.bind(this);
    this.submitAgent = this.submitAgent.bind(this);
    this.state = {
      username:'',
      email:'',
      age:'',
      password:''
    };
}

initialState = {
  username:'',
  email:'',
  age:'',
  password:''
}   

resetVoiture = () => {
  this.setState(() => this.state
  );
}
  
submitAgent = event => {
  event.preventDefault();
  const agent={
          username:this.state.username,
          email:this.state.email,
          age:this.state.age,
          password:this.state.password
  };      
  

axios.put("http://localhost:8080/api/test/Agent/"+this.props.match.params.id, agent)
      .then(response => {
      if (response.data != null) {
              this.setState(this.initialState);
              window.location.href("/crudPatient")

      }else{
        alert("wrong ")
      }
});
}



componentDidMount() {
  const CarId = +this.props.match.params.id;
  if (CarId) {
          axios.get("http://localhost:8080/api/test/Agent/"+CarId)
          .then(Response => Response.data)
          .then((data) => {
            let agent =data;
            this.setState({username:agent.username,email:agent.email,age:agent.age,password:agent.password});            
          })
  }
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
            <p>Welcome to Update des agents</p>
          </div>
        </div>

        <div className="Form">

        
            <Form onReset={this.resetVoiture} onSubmit={this.submitAgent} id="VoitureFormId"> 
           
         <Form.Row> 
            <Form.Group as={Col} controlId="formGridMarque"> 
               <Form.Label> Username </Form.Label> 
               <Form.Control required name="username" type="text" autoComplete="off" value={this.state.username} onChange={this.voitureChange}  placeholder= "Entrez Username"/> 
            </Form.Group> 

            <Form.Group as={Col} controlId="formGridModele"> 
                    <Form.Label> Email </Form.Label> 
                    <Form.Control required  name="email" type="text" value={this.state.email} autoComplete="off" onChange={this.voitureChange} placeholder= "Entrez Email"/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCouleur"> 
                    <Form.Label> Age </Form.Label> 
                    <Form.Control required value={this.state.age} name="age" type="text"  autoComplete="off" onChange={this.voitureChange}  placeholder= "Entrez age"/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridImmatricule"> 
               <Form.Label> Password </Form.Label> 
               <Form.Control required value={this.state.password} name="password"  type="password"  autoComplete="off" onChange={this.voitureChange} placeholder= "Entrez password"/> 
            </Form.Group> 
            
            </Form.Row> 

                 <div style={{"textAlign":"right"}}>
                      <Button size="sm" variant="success" type="submit"><FontAwesomeIcon icon={faSave} /> Update </Button> <i>&nbsp;</i>
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
