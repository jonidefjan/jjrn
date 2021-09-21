import {Container, Row, Col, Button, ButtonGroup, Carousel} from 'react-bootstrap';
import Header from '../../components/Header';
import premio from '../../assets/pix.png';
import Image from 'next/image';
import Footer from '../../components/Footer';


export const getStaticProps = async ()=> {
    const res = await fetch("http://localhost:3000/api/api");
    const data = await res.json();

    const sorteios = data.map(datas =>{

            const obj = {
                id: datas.ID,
                nome: datas.NOME,
                numero: datas.NUMEROSORTEIO,
                pago: datas.PAGO,
                vencedor: datas.FLGSTATUS,
                
            };

            return obj;
    })

    return {
        props: {sorteio: sorteios}
    }
}


export default function Sorteio1({sorteio}) {


  return (
      <>
        <Header/>
        <Container fluid align="center">
            <Row>
                <Col>
                    <h1>Sorteio 001 pix R$ 1400,00</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                <Carousel fade  prevLabel={null} nextLabel={null}>
                    <Carousel.Item>
                        <Image src={premio}   alt="premio" width={800} height={400} />
                        
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image src={premio}   alt="premio"  width={800} height={400}/>

                        
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image src={premio}   alt="premio"  width={800} height={400}/>

                        
                    </Carousel.Item>
                    </Carousel>
                    
                </Col>
            </Row>
            <hr/>
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
            <hr/>
            <Container fluid align="center">
                <Row>
                    <Col>
                        <ButtonGroup aria-label="Basic example">
                            <Button variant="light" className="filtro">Todos ({sorteio.length})</Button>
                            <Button variant="secondary" className="filtro">Disponível ({sorteio.length})</Button>
                            <Button variant="success" className="filtro">Pago({sorteio.length})</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                
            </Container>
            <hr/>
            <Container fluid align="center">
                <Row>
                    <Col>
                        {sorteio.map((numero, idx) => {


                            return <Button onclick="selecionaNumero" id={numero.id} variant="secondary" key={idx}  className={numero.pago + ' numero'  }>{numero.numero}</Button>

                        })}
                    </Col>
                </Row>
            </Container>
            <hr/>
            <Container fluid align="center">
                <Row>
                    <Col>
                           <Button id="compra" variant="success"> Comprar</Button>
                    </Col>
                </Row>
            </Container>
        </Container>
        <Footer/>
    </>
  );    
}

function selecionaNumero(props) {
    
}