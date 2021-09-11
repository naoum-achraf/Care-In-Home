import React from 'react';
import {Navbar, Container, Col} from 'react-bootstrap';
class Footer extends React.Component {
   render() {
       let fullYear = new Date().getFullYear();
       return (
           <Navbar fixed="bottom" bg="info" variant="dark">
           <Container>
           <Col lg={12} className="text-center text-light">
           <div class="font-weight-bold">
           {fullYear}-{fullYear+1}, All Rights Reserved by Master MIOLA
           </div>
           </Col>
           </Container>
           </Navbar>
       );
   }
}
export default Footer;