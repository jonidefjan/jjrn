import {Container, Row, Col} from 'react-bootstrap';
import Cards from '../components/card'
import Header from '../components/Header';

function Home({ Component, pageProps }) {
  return (
      <>
      <Header/>
    <Container fluid>

      <Container  fluid>

        <Row>
          <Col xs={12} style={{color:'#89e163'}}>
          <h1>SORTEIOS EM ANDAMENTO</h1>
          </Col>
        </Row>

        <Row>
          <Col xs={4}>
            <Cards/>
          </Col>
          <Col>
            <Cards/>
          </Col>
          <Col>
            <Cards/>
          </Col>
        </Row>

      </Container>

      <Container fluid >
        
        <Row>
          <Col xs={12} style={{color:'#89e163'}}>
            <h1>ÚLTIMOS SORTEIOS REALIZADOS</h1>
            <p>Vários participantes já tiveram seu sonho realizado em nossos sorteios!</p>
            <p>Você pode ser o próximo</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <Cards/>
          </Col>
          <Col>
            <Cards/>
          </Col>
          <Col>
            <Cards/>
          </Col>
        </Row>
        
      </Container>

    </Container>
    </>
  );
}

export default Home;
