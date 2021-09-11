import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";
import { Col, Button, Container, Row, InputGroup } from 'react-bootstrap';
import loginIcon from '../images/add.png';
import './Signin.css';
import UIImg from '../images/medical.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMailBulk,faUser, faLock, faPersonBooth, faBookMedical, faPassport, faBirthdayCake} from '@fortawesome/free-solid-svg-icons';



const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce n'est pas un email valide.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Le username doit etre entre 2 et 20 characters.
      </div>
    );
  }
};

const vage = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        L'age doit etre entre 2 et 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Le Mot de passe doit etre entre 6 et 40 characters.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      age: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeAge(e) {
    this.setState({
      age: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.age,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <>
        <Container className="rounded bg-dark mt-4">
          <Row>
          <Col lg={4} md={6} sm={12} className="text-center p-5">
                        <div>
                        <img className="icon-img" src={loginIcon} alt="icon"/>
                        </div>

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>

                <div className="form-group  mb-3">
                <InputGroup>
            <InputGroup.Prepend>
                  <InputGroup.Text>
                      <FontAwesomeIcon icon={faUser} />
                  </InputGroup.Text>
              </InputGroup.Prepend>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    placeholder="Enter Username"
                  />
                  </InputGroup>
                </div>

                <div className="form-group  mb-3">
                <InputGroup>
            <InputGroup.Prepend>
                  <InputGroup.Text>
                      <FontAwesomeIcon icon={faMailBulk} />
                  </InputGroup.Text>
              </InputGroup.Prepend>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    placeholder="Enter email"
                  />
                   </InputGroup>
                </div>

                <div className="form-group  mb-3">
                <InputGroup>
            <InputGroup.Prepend>
                  <InputGroup.Text>
                      <FontAwesomeIcon icon={faBirthdayCake} />
                  </InputGroup.Text>
              </InputGroup.Prepend>
                  <Input
                    type="text"
                    className="form-control"
                    name="age"
                    value={this.state.age}
                    onChange={this.onChangeAge}
                    placeholder="Enter age"
                  />
                   </InputGroup>
                </div>

                <div className="form-group  mb-3">
                <InputGroup>
            <InputGroup.Prepend>
                  <InputGroup.Text>
                      <FontAwesomeIcon icon={faLock} />
                  </InputGroup.Text>
              </InputGroup.Prepend>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    placeholder="Enter password"
                  />
                   </InputGroup>
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">S'inscrire</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
          </Col>
  

                    <Col lg={8} md={6} sm={12}>
                    <img className="w-100" src={UIImg} alt="" />
                    </Col>
          </Row>
        </Container>
      </>
    );
  }
}
