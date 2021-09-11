import "./Main1.css";
import hello from "../../assets/hello.svg";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar"
import AuthService from "../../../services/auth.service";
import axios from 'axios';
import {Card, Form, Button,Col} from 'react-bootstrap'; 
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAd, faBell, faEdit, faInfo, faList, faSms, faTrash} from '@fortawesome/free-solid-svg-icons';
import React from "react";
import { Link } from "react-router-dom";
import {faPlusSquare, faSave, faUndo} from '@fortawesome/free-solid-svg-icons';
import {CircleProgress} from 'react-gradient-progress'
import {ButtonGroup, Table} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'


class Main extends React.Component{

  constructor(props){
    super(props);
    this.addAlert = this.addAlert.bind(this);
    this.deleteVoiture = this.deleteVoiture.bind(this);
    this.voitureChange = this.voitureChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.state = {
        Patients : [],
        show1 : false,
        show2 : false,
        progress1:'',
        progress2:'',
        resultat : '',
        négatives: [],
        Messages : [],
        id:''

    };
}

resetVoiture = () => {
  this.setState({Messsage : ''}
 );
}

initialState = {
  message:''
} 


submitMessage = event => { 
  event.preventDefault();
  const message={
          message:this.state.message
  };      

  const config = { headers: {'Content-Type': 'application/json'} };
axios.put("http://localhost:8080/api/test/message/"+12, this.state.message,config)
      .then(response => {
      if (response.data != null) {
              this.setState({ show2: false});
              this.setState(this.initialState);
              alert("Send avec succes")
              
      }else{
        alert("wrong ")
      }
});
}



deleteVoiture = (agentId) => {
  axios.delete("http://localhost:8080/api/test/Agents/"+agentId)
    .then(response => {
      if(response.data != null){
          this.setState({
              Agents: this.state.négatives.filter(agent => agent.id !== agentId)
            })

            window.location.reload(false);
      }
    })
};



handleModal(patientId){
  this.setState({show1: !this.state.show1})
  axios.get("http://localhost:8080/api/test/Médicament/"+patientId)
          .then(Response => Response.data)
          .then((data) => {
            let agent =data;
            this.setState({progress1:agent[0],progress2:agent[1]});            
          })
  
  axios.get("http://localhost:8080/api/test/résultat/"+patientId)
          .then(Response => Response.data)
          .then((data) => {
            let agent =data;
            if(agent[0].resultat == true){
              this.setState({resultat:'Positive'});
            }else{
              this.setState({resultat:'Négative'});  
            }
                      
          })  


}

handleModal2(){
  this.setState({show2: !this.state.show2})
}


addAlert = (PatientId) =>{
  axios.put("http://localhost:8080/api/test/alert/"+PatientId)
  .then(response => {
  if (response.data != null) {
          alert("Update avec succes")
          window.location.reload(false);

  }else{
    alert("wrong ")
  }
});
}

componentDidMount(){
  axios.get("http://localhost:8080/api/test/allPatients/"+AuthService.getCurrentUser().id)
  .then(Response => Response.data)
  .then((data) => {
      this.setState({Patients: data});
  })

  axios.get("http://localhost:8080/api/test/négatives/"+AuthService.getCurrentUser().id)
  .then(Response => Response.data)
  .then((data) => {
      this.setState({négatives: data});
  })

}  

voitureChange =event => { 
  this.setState ( { 
          [event.target.name]:event.target.value } ); 

}   

  render(){ 
    const { message } = this.state;
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

        <Table className="one" striped bordered  variant="white" >
        <tbody>
        <tr>
          <th>Username</th>
          <th>Age</th>
        </tr>
        {
                        
                        this.state.Patients.length ===0 ?
                            <tr align="center">
                                <td colSpan="6"> Patients indisponibles</td>
                            </tr> :
                            this.state.Patients.map((agent) => (
                              
                                <tr key={agent.id}>
                                    <td>{agent.username}</td>
                                    <td>{agent.age}</td>
                                    <td>
                                        <ButtonGroup>
                                        <Button variant="info" className="infos" onClick={()=>{this.handleModal(agent.id)}}>  <FontAwesomeIcon icon={faInfo} /> Infos</Button>
                                            <Modal size="lg"
                                                  aria-labelledby="contained-modal-title-vcenter"
                                                  centered
                                                  show = {this.state.show1}>
                                                            <Modal.Header>
                                                                  Patient details
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                            <Table striped bordered hover variant="withe">
  <tbody className="ligne">
    <tr>
      <th width="10%">Rythme Cardiaque</th>
      <td colSpan="2">{Math.floor(Math.random() * 140)}</td>

    </tr>
    <tr>
      <th>Température</th>
      <td colSpan="2">{Math.floor(Math.random() * 40)}</td>

    </tr>
    <tr>
      <th>Tension</th>
      <td colSpan="2">{Math.floor(Math.random() * 100)}</td>
    </tr>

    <tr>
      <th>Avancement Médicaments</th>
      <td>Chloroquine {this.state.progress1}/7 jours</td>
      <td>Azthomique {this.state.progress2}/7 jours</td>
    </tr>

    <tr>
      <th>GPS</th>
      <td colSpan="2">Il a quitté la maison {Math.floor(Math.random() * 3)} fois</td>
    </tr>

    <tr>
      <th>Résultat Test</th>
      <td colSpan="2">{this.state.resultat}</td>
    </tr>

  </tbody>
</Table>
                                                            </Modal.Body>
                                                              <Modal.Footer>
                                                                  <Button onClick={() =>{this.handleModal()}}>
                                                                    Close
                                                                  </Button>
                                                              </Modal.Footer>
                                                      </Modal>
                                        <Button variant="warning"  className="infos" onClick={this.addAlert.bind(this,agent.id)}> <FontAwesomeIcon icon={faBell} /> Alert</Button>
                                        <Button variant="danger"  className="infos" onClick={()=>{this.handleModal2()}}> <FontAwesomeIcon icon={faSms} /> SMS </Button> 


                                        <Modal size="lg"
                                                  aria-labelledby="contained-modal-title-vcenter"
                                                  centered
                                                  show = {this.state.show2}>
                                                            <Modal.Header>
                                                                  Message
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                            <Form onReset={this.resetVoiture} onSubmit={this.submitMessage} id="VoitureFormId"> 
           
           <Form.Row> 
              <Form.Group as={Col} controlId="formGridMarque"> 
                 <Form.Control required name="message" as="textarea" type="text" autoComplete="off" value={message} onChange={this.voitureChange}  placeholder= "Saisie votre message ..."/> 
              </Form.Group>
              </Form.Row> 
  
                   <div style={{"textAlign":"right"}}>
                        <Button size="sm" variant="success" type="submit"><FontAwesomeIcon icon={faSave} /> Send </Button> <i>&nbsp;</i>
                        <Button size="sm" variant="info" type="reset"><FontAwesomeIcon icon={faUndo} /> Reset </Button>
                        </div>
              </Form>
                                                            </Modal.Body>
                                                              <Modal.Footer>
                                                                  <Button onClick={() =>{this.handleModal2()}}>
                                                                    Close
                                                                  </Button>
                                                              </Modal.Footer>
                                                      </Modal>                                   
                                        </ButtonGroup>
                                    </td>
                                    
                                </tr>


                            ))

                            
                            
                        }
                                          
        </tbody>
      </Table>

      <h3><br/><FontAwesomeIcon icon={faList}/> Liste des tests négatives</h3>

      <Table className="one" striped bordered  variant="white" >
        <tbody>
        <tr>
          <th>Username</th>
          <th>Age</th>
        </tr>
        {
                        this.state.négatives.length ===0 ?
                            <tr align="center">
                                <td colSpan="6"> Liste vide</td>
                            </tr> :
                            this.state.négatives.map((agent) => (
                              
                                <tr key={agent.id}>
                                    <td>{agent.username}</td>
                                    <td>{agent.age}</td>
                                    <td>
                                        <ButtonGroup>
                                        <Button variant="danger" onClick={this.deleteVoiture.bind(this,agent.id)}> Supprimer</Button>                           
                                        </ButtonGroup>
                                    </td>
                                    
                                </tr>


                            ))

                            
                            
                        }
                                          
        </tbody>
      </Table>



        </div>

      
      
    </main>

                 <Sidebar />

    
   </div>
    
    
  );
                      }
};

export default Main;
