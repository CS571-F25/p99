import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router';

function InfoCard({ title, description, buttonText, to }) {
  return (
    <Card style={{ backgroundColor: '#1a1a1a', border: '2px solid #8b5cf6', color: '#ffffff' }}>
      <Card.Body>
        <Card.Title style={{ color: '#8b5cf6' }}>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        {to ? (
          <Button
            as={Link}
            to={to}
            style={{ backgroundColor: '#8b5cf6', border: 'none' }}
            aria-label={`${buttonText} - ${title}`}
          >
            {buttonText}
          </Button>
        ) : (
          <Button
            style={{ backgroundColor: '#8b5cf6', border: 'none' }}
            aria-label={`${buttonText} - ${title}`}
          >
            {buttonText}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default InfoCard;

