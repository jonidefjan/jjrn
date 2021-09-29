import React from "react";
import Image from "next/image";
import {
  Button,
  ButtonGroup,
  Carousel,
  Col,
  Container,
  Row,
  Tooltip,
  OverlayTrigger,
  Modal,
  Form,
} from "react-bootstrap";

import premio from "../../assets/pix.png";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/api");
  const data = await res.json();

  const sorteios = data.map((datas) => {
    var ename = datas.NOME;
    var str = ename.substr(3, [ename.length - 5]);

    const obj = {
      id: datas.ID,
      nome: datas.NOME,
      numero: datas.NUMEROSORTEIO,
      pago: datas.PAGO,
      vencedor: datas.FLGSTATUS,
      preco: datas.PRECO,
      masked: str,
    };

    return obj;
  });

  return {
    props: { sorteio: sorteios },
  };
};

export default function Sorteio1({ sorteio }) {
  const [checked, setChecked] = React.useState([]);

  console.info(checked);

  const handleCheck = (button) => {
    const id = button.target.id;
    const currentIndex = checked.indexOf(id);

    if (currentIndex === -1) {
      setChecked((prevState) => [...prevState, id]);
    } else {
      setChecked(checked.filter((item) => item !== id));
    }
  };

  const filtro = (button) => {
    const id = button.target.id;
  };

  function Checkout() {
    const arr = checked.length;

    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (arr <= 0) {
      return (
        <>
          <Button id="compra" variant="success" onClick={handleShow}>
            Comprar
          </Button>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeLabel="">
              <Modal.Title>Atenção!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Selecione pelo menos um número para efetuar uma reserva!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Fechar
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    } else {
      return (
        <>
          <Button id="compra" variant="success" onClick={handleShow}>
            Comprar
          </Button>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Modal.Header closeLabel="">
              <Modal.Title>Reserva de número</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Form>
                  <Form.Group className="mb-3" controlId="numeros">
                    <Form.Label>Deseja reservar o(s) número(s):</Form.Label>
                    <Form.Label>
                      {" "}
                      {checked.map((numero, idx) => (
                        <Button id={idx} className="buttonCheckout" key={idx}>
                          <span>{numero}</span>
                        </Button>
                      ))}{" "}
                    </Form.Label>
                    <br />
                    <Form.Label>Valor a pagar: R$ {sorteio.preco}</Form.Label>
                    <br />
                    <Form.Label>
                      Por favor, preencha os dados abaixo:
                    </Form.Label>
                    <br />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                </Form>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="success">Aceitar</Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }

  return (
    <>
      <Header />
      <Container fluid align="center">
        <Row>
          <Col>
            <h1>Sorteio 001 pix R$ 1400,00</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Carousel fade prevLabel={null} nextLabel={null}>
              <Carousel.Item>
                <Image src={premio} alt="premio" width={800} height={400} />
              </Carousel.Item>
              <Carousel.Item>
                <Image src={premio} alt="premio" width={800} height={400} />
              </Carousel.Item>
              <Carousel.Item>
                <Image src={premio} alt="premio" width={800} height={400} />
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
        <hr />
        <Row className="regulamento">
          <Col>
            <h3>Regulamento/Descrição</h3>
            <h2>Edição Pix 1 valendo R$ 1.400,00:</h2>
            <ul>
              <li>1° Prêmio R$ 1.000,00</li>
              <li>2° Prêmio R$ 200,00</li>
              <li>3° Prêmio R$ 200,00</li>
            </ul>
          </Col>
        </Row>
        <Row className="desconto">
          <Col></Col>
        </Row>
        <hr />
        <Container fluid align="center">
          <Row>
            <Col>
              <ButtonGroup aria-label="Basic example">
                <Button
                  onClick={filtro}
                  id="todos"
                  variant="light"
                  className="filtro"
                >
                  Todos ({sorteio.length})
                </Button>
                <Button
                  onClick={filtro}
                  id="disponivel"
                  variant="secondary"
                  className="filtro"
                >
                  Disponível (
                  {sorteio.filter((item) => item.pago === "N").length})
                </Button>
                <Button
                  onClick={filtro}
                  id="reservado"
                  variant="info"
                  className="filtro"
                >
                  Reservado (
                  {sorteio.filter((item) => item.pago === "R").length})
                </Button>
                <Button
                  onClick={filtro}
                  id="pago"
                  variant="success"
                  className="filtro"
                >
                  Pago ({sorteio.filter((item) => item.pago === "S").length})
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Container>
        <hr />
        <Container fluid align="center">
          <Row>
            <Col>
              {sorteio.map((numero, idx) => {
                return (
                  <OverlayTrigger
                    key={idx}
                    placement="top"
                    overlay={<Tooltip>{numero.masked}</Tooltip>}
                  >
                    <Button
                      id={numero.numero}
                      key={idx}
                      variant={
                        checked.includes(numero.numero.toString())
                          ? "success"
                          : "secondary"
                      }
                      disabled={numero.pago === "S" || numero.pago === "R"}
                      onClick={handleCheck}
                      className={`${numero.pago} numero`}
                    >
                      {numero.numero}
                    </Button>
                  </OverlayTrigger>
                );
              })}
            </Col>
          </Row>
        </Container>
        <hr />
        <Container fluid align="center">
          <Row>
            <Col>
              <OverlayTrigger
                key={1}
                placement="top"
                overlay={<Tooltip id="tc">Comprar</Tooltip>}
              >
                <Checkout />
              </OverlayTrigger>
            </Col>
          </Row>
        </Container>
      </Container>
      <Footer />
    </>
  );
}
