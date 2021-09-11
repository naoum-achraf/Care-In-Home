import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";
import { Col, Button, Container,Row, InputGroup } from 'react-bootstrap';
import loginIcon from '../images/admin.png';
import UIImg from '../images/medical.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMailBulk, faLock} from '@fortawesome/free-solid-svg-icons';
import './Login.css';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce champ est obligatoire!
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {

        if(AuthService.getCurrentUser().roles[0] === 'ROLE_PATIENT'){
          this.props.history.push("/patient");
          window.location.reload();
        }else{
          if(AuthService.getCurrentUser().roles[0] === 'ROLE_ADMIN'){
            this.props.history.push("/admin");
          window.location.reload();
          }else{
            this.props.history.push("/agent");
          window.location.reload();
          }
        }
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
    <>
      <Container className="rounded bg-dark mt-5">
        <Row>
        <Col lg={4} md={6} sm={12} className="text-center mt-5 p-5">
                        <img className="icon-img" src={loginIcon} alt="icon" />
          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group mb-3">
            <InputGroup>
            <InputGroup.Prepend>
                  <InputGroup.Text>
                      <FontAwesomeIcon icon={faMailBulk} />
                  </InputGroup.Text>
              </InputGroup.Prepend>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                placeholder="Enter username"
                onChange={this.onChangeUsername}
              />
              </InputGroup>
            </div>

            <div className="form-group mb-3">
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
                placeholder="Enter password"
                onChange={this.onChangePassword}
              />
              </InputGroup>
            </div>


            <div className="form-group">
              <Button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
                variant="primary btn-block"
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Se connecter</span>
              </Button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
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
