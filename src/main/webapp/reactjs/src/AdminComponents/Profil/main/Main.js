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
            <p>Profile Admin</p>
          </div>
        </div>
    <div className="container">
        <Table striped bordered hover variant="white" >
        <tbody>

        <tr>
          <th>Username</th>
          <td>{AuthService.getCurrentUser().username}</td>
        </tr>        

        <tr>
          <th>Age</th>
          <td>{AuthService.getCurrentUser().age}</td>
        </tr>  

        <tr>
          <th>Email</th>
          <td>{AuthService.getCurrentUser().email}</td>
        </tr>  
        </tbody>
      </Table>
      </div>
      </div>
    </main>
    <Sidebar />
   </div>
    
    
  );
                      }
};

export default Main;
