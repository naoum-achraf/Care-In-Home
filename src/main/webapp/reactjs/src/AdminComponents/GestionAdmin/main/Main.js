import "./Main.css";
import hello from "../../assets/hello.svg";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar"
import AuthService from "../../../services/auth.service";
import axios from 'axios';
import {Button, ButtonGroup, Card, Table} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAd, faEdit, faList, faTrash} from '@fortawesome/free-solid-svg-icons';
import UserService from "../../../services/user.service"; 
import React from "react";
import { Link } from "react-router-dom";
import {faPlusSquare, faSave, faUndo} from '@fortawesome/free-solid-svg-icons';



class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        Agents : []
    };
}
  
componentDidMount(){
  axios.get("http://localhost:8080/api/test/allAgents")
  .then(Response => Response.data)
  .then((data) => {
      this.setState({Agents: data});
  })
}    


deleteVoiture = (agentId) => {
  axios.delete("http://localhost:8080/api/test/Agents/"+agentId)
    .then(response => {
      if(response.data != null){
          this.setState({ show: true });
          this.setState({
              Agents: this.state.Agents.filter(agent => agent.id !== agentId)
            })
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
            <p>Welcome to gestion des agents</p>
          </div>
        </div>
    <div className="container">
        <Table striped bordered hover variant="white" >
        <tbody>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Age</th>
          <th>Hopitale</th>
        </tr>
        {
                        
                        this.state.Agents.length ===0 ?
                            <tr align="center">
                                <td colSpan="6"> Voitures disponibles</td>
                            </tr> :
                            this.state.Agents.map((agent) => (
                              
                                <tr key={agent.id}>
                                    <td>{agent.username}</td>
                                    <td>{agent.email}</td>
                                    <td>{agent.age}</td>
                                    <td>{agent.hopitale}</td>
                                    <th>
                                        <ButtonGroup>
                                        <Link to={"editAgent/"+agent.id} className="btn btn-sm btn-outline-primary"> <FontAwesomeIcon icon={faEdit} /></Link><h6> &nbsp;</h6>
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
      <Link to={"/addAg"}><Button className="content-center" size="lg" variant="success" type="submit"><FontAwesomeIcon icon={faPlusSquare} /> Ajouter </Button></Link>
      </div>
      </div>
    </main>
    <Sidebar />
   </div>
    
    
  );
                      }
};

export default Main;
