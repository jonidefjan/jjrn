import React from "react";
import Image from "next/image";
import {
  Button,
  ButtonGroup,
  Carousel,
  Col,
  Container,
  Form,
  Modal,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";

import premio from "../../assets/pix.png";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useNumbersContext } from "../../contexts/NumbersContext";
import { formatCurrency } from "../../lib/format";
import Link from "next/link";
import { useState } from "react";

export const getServerSideProps = async () => {
  const res = await fetch("https://jjrn.vercel.app/api/api");
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
      sorteio: datas.SORTEIO,
    };

    return obj;
  });

  return {
    props: { sorteio: sorteios },
  };
};

function Checkout({ sorteio }) {
  const [show, setShow] = React.useState(false);
  const [validated, setValidated] = React.useState(false);
  const { numbers, removeNumber } = useNumbersContext();

  console.log(validated);

  const arr = numbers.length;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRemove = (element) => {
    removeNumber(element.target.innerText);
  };

  const price = sorteio[0].preco;
  const finalPrice = formatCurrency(arr * price);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log(form);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();
    setValidated(true);
  };

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
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="numeros">
                  <Form.Label>Deseja reservar o(s) número(s):</Form.Label>
                  <br />
                  <Form.Label>
                    {" "}
                    {numbers.map((numero, idx) => (
                      <Button
                        id={idx}
                        variant="success"
                        className="buttonCheckout"
                        key={idx}
                        onClick={handleRemove}
                      >
                        <span>{numero}</span>
                      </Button>
                    ))}{" "}
                  </Form.Label>
                  <br />
                  <Form.Label>Valor a pagar: {finalPrice}</Form.Label>
                  <br />
                  <Form.Label>Por favor, preencha os dados abaixo:</Form.Label>
                  <br />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupNome">
                  <Form.Label>Nome Completo:</Form.Label>
                  <Form.Control
                    defaultValue=""
                    type="text"
                    placeholder="Insira seu nome completo"
                    maxLength="32"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupCel">
                  <Form.Label>Celular</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Insira seu telefone"
                    maxLength="11"
                    required
                    defaultValue=""
                  />
                </Form.Group>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                  </Button>
                  <Button
                    variant="success"
                    type="submit"
                    className="whatsCheckout"
                    onSubmit={handleSubmit}
                  >
                    Aceitar
                  </Button>
                </Modal.Footer>
              </Form>
            </Container>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default function Sorteio1({ sorteio }) {
  const { numbers, addNumber } = useNumbersContext();
  console.log(numbers);

  const handleCheck = (button) => addNumber(button.target.id);

  const filtro = (button) => {
    const id = button.target.id;
  };

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
                        numbers.includes(numero.numero.toString())
                          ? "success"
                          : "secondary"
                      }
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
                <Checkout sorteio={sorteio} />
              </OverlayTrigger>
            </Col>
          </Row>
        </Container>
      </Container>
      <Footer />
    </>
  );
}
