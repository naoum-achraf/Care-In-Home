import "./Main.css";
import hello from "../../assets/hello.svg";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar"
import AuthService from "../../../services/auth.service";
import axios from 'axios';
import {Button, ButtonGroup, Card, Table} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAd, faClipboardList, faEdit, faList, faTrash, faTruckLoading} from '@fortawesome/free-solid-svg-icons';
import UserService from "../../../services/user.service"; 
import React from "react";
import { Link } from "react-router-dom";
import {faPlusSquare, faSave, faUndo} from '@fortawesome/free-solid-svg-icons';



class Main extends React.Component{
  constructor(props){
    super(props);
    this.deleteVoiture = this.deleteVoiture.bind(this);
    this.state = {
        Patients : []
    };
}
  
componentDidMount(){
  axios.get("http://localhost:8080/api/test/allPatients/"+AuthService.getCurrentUser().id)
  .then(Response => Response.data)
  .then((data) => {
      this.setState({Patients: data});
  })
}    

deleteVoiture = (agentId) => {
  axios.delete("http://localhost:8080/api/test/Agents/"+agentId)
    .then(response => {
      if(response.data != null){
          this.setState({ show: true });
          this.setState({
              Agents: this.state.Patients.filter(agent => agent.id !== agentId)
            })
            window.location.reload(false)
      }
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
            <p>La liste des patients </p>
          </div>
        </div>
        <div className="container">
        <Table striped bordered hover variant="white" >
        <tbody>
        <tr>
          <th>Username</th>
          <th>Email</th>
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
                                    <td>{agent.email}</td>
                                    <td>{agent.age}</td>
                                    <th>
                                        <ButtonGroup>
                                        <Link to={"editPatient/"+agent.id} className="btn btn-sm btn-outline-primary"> <FontAwesomeIcon icon={faEdit} /></Link><h6> &nbsp;</h6>
                                            <Button size="sm" variant="outline-danger" onClick={this.deleteVoiture.bind(this,agent.id)}><FontAwesomeIcon icon={faTrash} /></Button>                                       
                                        </ButtonGroup>
                                    </th>
                                    
                                </tr>


                            ))

                            
                            
                        }
                                          
        </tbody>
      </Table>
      </div>
      <div class="row justify-content-center">
      <Link to={"/addPatient"}><Button className="content-center" size="lg" variant="success" type="submit"><FontAwesomeIcon icon={faPlusSquare} /> Ajouter </Button></Link>
      </div>
      </div>
    </main>
    <Sidebar />
   </div>
    
    
  );
                      }
};

export default Main;
