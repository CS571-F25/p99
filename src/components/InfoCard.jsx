import { Card, Button } from 'react-bootstrap';

function InfoCard({ title, description, buttonText }) {
  return (
    <Card style={{ backgroundColor: '#1a1a1a', border: '2px solid #8b5cf6', color: '#ffffff' }}>
      <Card.Body>
        <Card.Title style={{ color: '#8b5cf6' }}>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Button style={{ backgroundColor: '#8b5cf6', border: 'none' }}>{buttonText}</Button>
      </Card.Body>
    </Card>
  );
}

export default InfoCard;

