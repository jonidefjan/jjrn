import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <Container fluid={true} align="center">
      <hr />
      <Row>
        <Col>
          <p>© JJRN- Todos os direitos reservados - 2021</p>
        </Col>
      </Row>
    </Container>
  );
}
