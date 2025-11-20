import { ListGroup, Badge, Button, Row, Col } from 'react-bootstrap';

function PurchaseItem({ event, date, venue, qty, total, status }) {
  return (
    <ListGroup.Item style={{ backgroundColor: '#1a1a1a', border: '1px solid #8b5cf6', color: '#ffffff', marginBottom: '10px' }}>
      <Row className="align-items-center">
        <Col md={6}>
          <h5 style={{ color: '#8b5cf6' }}>{event}</h5>
          <p className="mb-0" style={{ color: '#a78bfa' }}>
            {date} • {venue}
          </p>
          <p className="mb-0" style={{ color: '#a78bfa' }}>
            Quantity: {qty}
          </p>
        </Col>
        <Col md={3}>
          <Badge style={{ backgroundColor: '#8b5cf6' }}>{status}</Badge>
          <div><strong style={{ color: '#ffffff' }}>{total}</strong></div>
        </Col>
        <Col md={3}>
          <Button style={{ backgroundColor: '#8b5cf6', border: 'none' }} size="sm">View Details</Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

export default PurchaseItem;

