import React from 'react';
import { Col,Form, Button, Container, Row, InputGroup } from 'react-bootstrap';
import loginIcon from '../images/add.png';
import './Signin.css';
import UIImg from '../images/medical.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMailBulk,faUser, faLock, faPersonBooth, faBookMedical, faPassport} from '@fortawesome/free-solid-svg-icons';


const Login =() => {
    return(
        <>
            <Container className="rounded bg-dark mt-4">
                <Row>
                    <Col lg={4} md={6} sm={12} className="text-center p-5">
                        <div>
                        <img className="icon-img" src={loginIcon} alt="icon"/>
                        </div>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicName">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faUser} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="text" placeholder="Name" />
                        </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicMail">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faMailBulk} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="mail" placeholder="Mail" />
                        </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicHopitale">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faBookMedical} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="text" placeholder="Name Hopitale" />
                        </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCIN">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faPassport} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="text" placeholder="CIN" />
                        </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faLock} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="password" placeholder="Password" />
                        </InputGroup>
                            
                        </Form.Group>
                        
                        <Button variant="primary btn-block" type="submit">
                            Envoyer demande
                        </Button>
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
export default Login