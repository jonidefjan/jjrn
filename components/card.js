import {Card} from 'react-bootstrap';
import pix from '../assets/pix.jpg';


const Cards = () =>{
    return (
        <Card bg='dark' style={{color:'#89e163'}}>
            <Card.Img variant="top" src={pix} />
            <Card.Body>
            <Card.Title>Sorteio 1</Card.Title>
            <Card.Text>
                Premio x
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted">Data</small>
            </Card.Footer>
        </Card>
    );
  }
  
  export default Cards;