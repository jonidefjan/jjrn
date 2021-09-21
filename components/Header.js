import React from 'react';
import {Nav, Navbar, Container} from 'react-bootstrap';


export default function Header() {
    return (
        <Navbar bg="dark" expand="lg" variant="dark" >
  <Container>
    <Navbar.Brand href="/">JJRN</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/sorteados">Sorteados</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    );
  }
  
