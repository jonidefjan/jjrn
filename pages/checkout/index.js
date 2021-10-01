import React from "react";
import { Button, Col, Container, Row, Table, Card } from "react-bootstrap";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Image from "next/image";
import logo1 from "../../assets/Como-cadastrar-chave-pix-no-nubank.png";
import logo2 from "../../assets/Como-Cadastrar-o.png";
import logo3 from "../../assets/logo-bradesco-768.png";

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

export default function Pagamentos({ sorteio }) {
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
                  <td>Mark</td>
                </tr>
                <tr>
                  <td>Telefone:</td>
                  <td>(11) 95356-8287</td>
                </tr>
                <tr>
                  <td>Quantidade:</td>
                  <td>{sorteio.length} Número(s)</td>
                </tr>
                <tr>
                  <td>Números Reservados:</td>
                  <td>05</td>
                </tr>
                <tr>
                  <td>VALOR A PAGAR:</td>
                  <td>R$ 149,00</td>
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
                    2° Prêmio R$ 200,00
                    <br />
                    3° Prêmio R$ 200,00
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
          <Col>
            <Card bg="dark" style={{ color: "#89e163" }}>
              <Image src={logo1} alt="Nubank Pix" width={500} height={500} />
              <Card.Body>
                <Card.Title>Pix Nubank</Card.Title>
                <Card.Text>
                  Favorecido: José Jacson da Silva de Sena
                  <br />
                  Chave: 325 951 198 - 93
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card bg="dark" style={{ color: "#89e163" }}>
              <Image src={logo2} alt="Bradesco Pix" width={500} height={500} />
              <Card.Body>
                <Card.Title>Pix Bradesco</Card.Title>
                <Card.Text>
                  Favorecido: José Jacson da Silva de Sena
                  <br />
                  Chave: 11 93078 3898
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card bg="dark" style={{ color: "#89e163" }}>
              <Image
                src={logo3}
                alt="Transferencia Bradesco"
                width={500}
                height={500}
              />
              <Card.Body>
                <Card.Title>Transferencia Bradesco</Card.Title>
                <Card.Text>
                  FAg.: 0160 C/c.: 0099297-6 José Jacson da Silva de Sena
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
