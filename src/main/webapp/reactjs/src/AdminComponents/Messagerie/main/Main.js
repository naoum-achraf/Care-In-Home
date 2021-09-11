import "./Main.css";
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

  console.log(this.state.message)
  const config = { headers: {'Content-Type': 'application/json'} };
axios.put("http://localhost:8080/api/test/message/"+2, this.state.message,config)
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

handleModal2(){
  this.setState({show2: !this.state.show2})
}

componentDidMount(){
  axios.get("http://localhost:8080/api/test/allAgents/")
  .then(Response => Response.data)
  .then((data) => {
      this.setState({Patients: data});
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



        </div>

      
      
    </main>

                 <Sidebar />

    
   </div>
    
    
  );
                      }
};

export default Main;
