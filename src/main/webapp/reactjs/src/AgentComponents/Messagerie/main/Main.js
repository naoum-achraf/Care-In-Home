import "./Main.css";
import hello from "../../assets/hello.svg";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar"
import AuthService from "../../../services/auth.service";
import axios from 'axios';
import {Card, Form, Button,Col} from 'react-bootstrap'; 
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAd, faBell, faEdit, faInfo, faList, faTrash} from '@fortawesome/free-solid-svg-icons';
import React from "react";
import { Link } from "react-router-dom";
import {faPlusSquare, faSave, faUndo} from '@fortawesome/free-solid-svg-icons';
import {CircleProgress} from 'react-gradient-progress'
import {ButtonGroup, Table} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'

class Main extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        Patients : [],
    };
}



componentDidMount(){
  axios.get("http://localhost:8080/api/test/message/"+AuthService.getCurrentUser().id)
  .then(Response => Response.data)
  .then((data) => {
      this.setState({Patients: data[0]});
      console.log(this.state.Patients.message)
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
            <p>Boite Messagerie avec L'admin</p>
          </div>
        </div>

        <Table className="one" striped bordered  variant="white" >
        <tbody>
        {
                        
                        this.state.Patients.message === null ?
                            <tr align="center">
                                <td colSpan="6"> Boite Vide</td>
                            </tr> :
                              
                                <tr key={this.state.Patients.id}>
                                    <td>Admin</td>
                                    <td>{this.state.Patients.message}</td> 
                                </tr>


                            

                            
                            
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
