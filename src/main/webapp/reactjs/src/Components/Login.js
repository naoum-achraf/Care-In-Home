import React, { Component } from 'react';
import { Col,Form, Button, Container, Row, InputGroup } from 'react-bootstrap';
import loginIcon from '../images/admin.png';
import './Login.css';
import UIImg from '../images/medical.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMailBulk, faLock} from '@fortawesome/free-solid-svg-icons';


import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

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
          this.props.history.push("/profile");
          window.location.reload();
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
    return(
        <>
            <Container className="rounded bg-dark mt-5">
                <Row>
                    <Col lg={4} md={6} sm={12} className="text-center mt-5 p-5">
                        <img className="icon-img" src={loginIcon} alt="icon" />
                    <Form onSubmit={this.handleLogin}
                        ref={c => {
                        this.form = c;
                        }}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faMailBulk} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="email" placeholder="Enter email" name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}/>
                        </InputGroup>
                            
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faLock} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="password" placeholder="Password" name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}/>
                        </InputGroup>
                            
                        </Form.Group>
                        
                        <Button variant="primary btn-block" type="submit" disabled={this.state.loading}>
                        {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}Se connecter
                        </Button>

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