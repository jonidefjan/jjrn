import {Card} from 'react-bootstrap';
import pix from '../assets/pix.jpg';
import Image from 'next/image';
import Link from 'next/link';


const Cards = () =>{
    return (
        <Card bg='dark' style={{color:'#89e163'}}>
            <Image  src={pix} alt="Premio" />
            <Card.Body>
            <Card.Title>Sorteio 1</Card.Title>
            <Card.Text>
                <Link href={`/sorteio/1`}>
                    <a>premio</a>
                </Link>
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted">Data</small>
            </Card.Footer>
        </Card>
    );
  }
  
  export default Cards;