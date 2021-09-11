import React, { Component } from "react";
import { useState } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import Main from "../AdminComponents/DashAdmin/main/Main";
import Navbar from "../AdminComponents/DashAdmin/navbar/Navbar";
import Sidebar from "../AdminComponents/DashAdmin/sidebar/Sidebar";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""

    };

    
  }
  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    return (
      <div className="container">
      <Navbar  />
      <Main />
      <Sidebar  />
    </div>
    );
  }
}
