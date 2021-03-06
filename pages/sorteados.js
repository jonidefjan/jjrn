import { Col, Container, Row } from "react-bootstrap";

import Cards from "../components/card";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Home({ Component, pageProps }) {
  return (
    <>
      <Header />
      <hr />
      <Container fluid align="center">
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
