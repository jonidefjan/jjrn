import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
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
import InputMask from "react-input-mask";

import premio from "../../assets/pix.png";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useNumbersContext } from "../../contexts/NumbersContext";
import { formatCurrency } from "../../lib/format";

export const getServerSideProps = async (context) => {
  const { num } = context.query;
  const res = await fetch(`https://jjrn.vercel.app/api/api?num=${num}`);
  const data = await res.json();

  const sorteios = data.map((datas) => {
    var ename = datas.NOME;
    var str = ename.substr(2, [ename.length - 2]);

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
  const router = useRouter();
  const { numbers, removeNumber } = useNumbersContext();

  const arr = numbers.length;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRemove = (element) => {
    removeNumber(element.target.innerText);
  };

  const price = sorteio[0].preco;
  const finalPrice = formatCurrency(arr * price);

  function TelInput(props) {
    return (
      <InputMask
        name="telefone"
        mask="(99) 9 9999-9999"
        onChange={props.onChange}
        value={props.value}
        placeholder="Insira seu celular"
        className="form-control"
      />
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    const name = form.nome.value;
    const tel = form.telefone.value;

    if (!form.checkValidity()) {
      setValidated(true);
    }

    numbers.forEach(async (number) => {
      await fetch(`https://jjrn.vercel.app/api/update`, {
        method: "POST",
        body: JSON.stringify({
          numero: {
            id: number,
            nome: name,
            tel,
          },
        }),
      });
    });

    if (typeof window !== "undefined") {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("tel", tel);
      window.localStorage.setItem("reserved-numbers", numbers.length);
      window.localStorage.setItem("numbers", numbers);
      window.localStorage.setItem("price", finalPrice);

      router.push("/checkout");
      return;
    }

    setShow(false);
    router.reload();
  };

  if (arr <= 0) {
    return (
      <>
        <Button id="compra" variant="success" onClick={handleShow}>
          Selecione algum número
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
          Reservar Número(s)
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeLabel="">
            <Modal.Title>Reserva de número(s)</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                className="formReserva"
              >
                <Form.Group className="mb-3" controlId="numeros">
                  <Form.Label>Deseja reservar o(s) número(s):</Form.Label>
                  <br />
                  <Form.Label>
                    {" "}
                    {numbers.map((numero, idx) => (
                      <Button
                        id={idx.toString()}
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
                    name="nome"
                    type="text"
                    placeholder="Insira seu nome completo"
                    maxLength={32}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupCel">
                  <Form.Label>Celular:</Form.Label>
                  <br />
                  <TelInput />
                </Form.Group>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                  </Button>
                  <Button
                    variant="success"
                    type="submit"
                    onSubmit={handleSubmit}
                    className="submit"
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
  const [showM, setShowM] = React.useState(false);
  const { numbers, addNumber } = useNumbersContext();

  const handleCheck = (button) => addNumber(button.target.id);

  const handleCloseM = () => setShowM(false);
  const handleShowM = () => setShowM(true);

  const filtro = (button) => {
    const id = button.target.id;
  };

  function TelInput(props) {
    return (
      <InputMask
        mask="(99) 9 9999-9999"
        onChange={props.onChange}
        value={props.value}
        placeholder="Insira seu celular"
        className="form-control"
      />
    );
  }

  return (
    <>
      <Header />
      <Container fluid align="center">
        <Row>
          <Col>
            <h1>Ação entre amigos PIX 1.0 - R$ 1.400,00</h1>
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
            <h3>Ação entre amigos PIX 1.0</h3>
            <h4>Regulamento/Descrição</h4>
            <ul>
              <li>1° Prêmio R$ 1.000,00</li>
              <li>2° Prêmio R$ 100,00</li>
              <li>3° Prêmio R$ 100,00</li>
              <li>4° Prêmio R$ 100,00</li>
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
                <Button id="pagamento" variant="danger" onClick={handleShowM}>
                  Clique para pagar
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
                overlay={<Tooltip id="tc">Reservar Número(s)</Tooltip>}
              >
                <Checkout sorteio={sorteio} />
              </OverlayTrigger>
            </Col>
          </Row>
        </Container>
      </Container>
      <Modal
        show={showM}
        onHide={handleCloseM}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeLabel="">
          <Modal.Title>Buscar meus números</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TelInput />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseM}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </>
  );
}