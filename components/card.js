import Image from "next/image";
import Link from "next/link";
import { Button, Card } from "react-bootstrap";

import pix from "../assets/pix.jpg";

const Cards = (props) => {
  const link = props.link;
  const sorteio = props.sorteio;

  return (
    <Card bg="dark" style={{ color: "#E6770C" }}>
      <Image src={pix} alt="Premio" />
      <Card.Body>
        <Card.Title>Ação entre amigos {sorteio}</Card.Title>
        <hr />
        <Card.Text>
          <Link href={`/sorteio/${link}`}>
            <Button variant="success" className="cardParticipar">
              Participar
            </Button>
          </Link>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">01/10/2021</small>
      </Card.Footer>
    </Card>
  );
};

export default Cards;
