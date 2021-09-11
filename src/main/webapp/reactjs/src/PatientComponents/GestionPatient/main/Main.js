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
    this.state = {
        Médicaments : []
    };
}
  
componentDidMount(){
  axios.get("http://localhost:8080/api/test/allMédicaments")
  .then(Response => Response.data)
  .then((data) => {
      this.setState({Médicaments: data});
  })
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
            <p>La liste des médicaments </p>
          </div>
        </div>
    <div className="container">
        <Table striped bordered hover variant="white" >
        <tbody>
        <tr>
          <th>Name</th>
          <th>Durée</th>
          <th>N° fois /jour</th>
          <th>Prix</th>
        </tr>
        {
                        
                        this.state.Médicaments.length ===0 ?
                            <tr align="center">
                                <td colSpan="6"> Voitures disponibles</td>
                            </tr> :
                            this.state.Médicaments.map((agent) => (
                              
                                <tr key={agent.id}>
                                    <td>{agent.name}</td>
                                    <td>{agent.durée}</td>
                                    <td>{agent.nbrfoispj}</td>
                                    <td>{agent.prix}</td>
                                </tr>


                            ))

                            
                            
                        }
                                          
        </tbody>
      </Table>
      </div>
      <div class="row justify-content-center">
      <Link to={"/progress"}><Button className="content-center" size="lg" variant="success" type="submit"><FontAwesomeIcon icon={faClipboardList} /> Progress </Button></Link>
      </div>
      </div>
    </main>
    <Sidebar />
   </div>
    
    
  );
                      }
};

export default Main;
