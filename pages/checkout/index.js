import React from "react";
import Image from "next/image";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";

import logo3 from "../../assets/logo-bradesco-768.png";
import logo1 from "../../assets/Como-cadastrar-chave-pix-no-nubank.png";
import logo2 from "../../assets/Como-Cadastrar-o.png";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export const getServerSideProps = async (context) => {
  const { num } = context.query;
  const res = await fetch(`https://jjrn.vercel.app/api/api?num=${num}`);
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

export default function Pagamentos({ sorteio }) {
  let nome = "";
  let tel = "";
  let reservedNumbers = "";
  let numbers = "";
  let price = "";

  if (typeof window !== "undefined") {
    nome = window.localStorage.getItem("name");
    tel = window.localStorage.getItem("tel");
    reservedNumbers = window.localStorage.getItem("reserved-numbers");
    numbers = window.localStorage.getItem("numbers");
    price = window.localStorage.getItem("price");
  }

  return (
    <>
      <Header />
      <Container fluid align="center">
        <Row>
          <Col>
            <h1>Parabéns, sua reserva foi efetuada com sucesso!</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Informações da Reserva </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Participante:</td>
                  <td>{nome}</td>
                </tr>
                <tr>
                  <td>Telefone:</td>
                  <td>{tel}</td>
                </tr>
                <tr>
                  <td>Quantidade:</td>
                  <td>{reservedNumbers} Número(s)</td>
                </tr>
                <tr>
                  <td>Números Reservados:</td>
                  <td>{numbers}</td>
                </tr>
                <tr>
                  <td>VALOR A PAGAR:</td>
                  <td>{price}</td>
                </tr>
                <tr>
                  <td>Já fez o pagamento? Envie para nós!</td>
                  <td>
                    <Button className="whatsCheckout">
                      <a href="https://api.whatsapp.com/send?phone=5511974070237&text=Ol%C3%A1,%20reservei%20n%C3%BAmero%20na%20rifa%20Edi%C3%A7%C3%A3o+pix+001+e%20gostaria%20de%20enviar%20o%20comprovante%20de%20pagamento!">
                        Envie por Whatsapp
                      </a>
                    </Button>{" "}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>icone</th>
                  <th> Informações do Sorteio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sorteio:</td>
                  <td>
                    Pix 1 valendo R$ 1.400,00:
                    <br />
                    1° Prêmio R$ 1.000,00
                    <br />
                    2° Prêmio R$ 100,00
                    <br />
                    3° Prêmio R$ 100,00
                    <br />
                    4° Prêmio R$ 100,00
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <h1>Selecione abaixo a forma do pagamento</h1>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md="4">
            <Card variant="dark">
              <Image src={logo1} alt="Nubank Pix" width={500} height={500} />
              <Card.Body>
                <Card.Title>Pix Nubank</Card.Title>
                <Card.Text className="preto">
                  Favorecido: José Jacson da Silva de Sena
                  <br />
                  Chave: 325 951 198 - 93
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <br />
          <Col md="4">
            <Card variant="dark">
              <Image src={logo2} alt="Bradesco Pix" width={500} height={500} />
              <Card.Body>
                <Card.Title>Pix Bradesco</Card.Title>
                <Card.Text className="preto">
                  Favorecido: José Jacson da Silva de Sena
                  <br />
                  Chave: 11 93078 3898
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <br />
          <Col md="4">
            <Card variant="dark">
              <Image
                src={logo3}
                alt="Transferencia Bradesco"
                width={500}
                height={500}
              />
              <Card.Body>
                <Card.Title>Transferencia Bradesco</Card.Title>
                <Card.Text className="preto">
                  FAg.: 0160 C/c.: 0099297-6 <br />
                  José Jacson da Silva de Sena
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
