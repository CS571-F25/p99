import { Card, Badge, Button } from 'react-bootstrap';

function TourCard({ city, date, venue, price }) {
  return (
    <Card style={{ backgroundColor: '#1a1a1a', border: '2px solid #8b5cf6', color: '#ffffff' }}>
      <Card.Body>
        <Card.Title style={{ color: '#8b5cf6' }}>{city}</Card.Title>
        <Badge style={{ backgroundColor: '#6d28d9' }} className="mb-2">CIRCUS MAXIMUS</Badge>
        <Card.Text>
          <strong style={{ color: '#a78bfa' }}>Date:</strong> {date}<br />
          <strong style={{ color: '#a78bfa' }}>Venue:</strong> {venue}<br />
          <strong style={{ color: '#a78bfa' }}>Price:</strong> {price}
        </Card.Text>
        <Button style={{ backgroundColor: '#8b5cf6', border: 'none' }} size="sm">Buy Tickets</Button>
      </Card.Body>
    </Card>
  );
}

export default TourCard;

