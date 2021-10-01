import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import Cards from "../components/card";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Home() {
  return (
    <>
      <Header />
      <hr />
      <Container fluid align="center">
        <Container fluid>
          <Row>
            <Col xs={12} style={{ color: "#89e163" }}>
              <h1>SORTEIOS EM ANDAMENTO</h1>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col xs={4}>
              <Cards />
            </Col>
          </Row>
          <hr />
        </Container>

        <Container fluid>
          <Row>
            <Col xs={12} style={{ color: "#89e163" }}>
              <h1>ÚLTIMOS SORTEIOS REALIZADOS</h1>
              <p>
                Vários participantes já tiveram seu sonho realizado em nossos
                sorteios!
              </p>
              <p>Você pode ser o próximo</p>
            </Col>
          </Row>

          <Row>
            <Col xs={4}>
              <Cards />
            </Col>
          </Row>
          <hr />
        </Container>
      </Container>
      <Footer />
    </>
  );
}

export default Home;
