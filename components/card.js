import { Button, Card } from "react-bootstrap";
import pix from "../assets/pix.jpg";
import Image from "next/image";
import Link from "next/link";

const Cards = () => {
  return (
    <Card bg="dark" style={{ color: "#89e163" }}>
      <Image src={pix} alt="Premio" />
      <Card.Body>
        <Card.Title>Edição Pix 001 valendo R$ 1.400,00</Card.Title>
        <hr />
        <Card.Text>
          <Link href={`/sorteio/1`}>
            <Button variant="success">Participar</Button>
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
