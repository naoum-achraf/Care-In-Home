import axios from 'axios';
import authHeader from './auth-header';
import React from 'react';


const API_URL = 'http://localhost:8080/api/test/';

class UserService extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        Agents : []
    };
}
  getPatientBoard() {
    return axios.get(API_URL + 'patient', { headers: authHeader() });
  }

  getAgentBoard() {
    return axios.get(API_URL + 'agent', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }


  async getAllAgents() {
    return await axios.get(await API_URL + 'allAgents')
                        .then(Response =>Response.data)
  }
  
}

export default new UserService();
