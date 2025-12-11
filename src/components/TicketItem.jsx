import { Card, Badge, Button, Row, Col } from 'react-bootstrap';

function TicketItem({ ticket, onRemove }) {
  const event = ticket.events || {};

  return (
    <Card
      style={{
        backgroundColor: '#1a1a1a',
        border: '2px solid #8b5cf6',
        color: '#ffffff',
        marginBottom: '15px'
      }}
    >
      <Card.Body>
        <Row className="align-items-center">
          <Col md={8}>
            <Card.Title style={{ color: '#8b5cf6', marginBottom: '10px' }}>
              {event.city || 'Event'}
            </Card.Title>
            <Badge style={{ backgroundColor: '#6d28d9' }} className="mb-2">
              CIRCUS MAXIMUS
            </Badge>
            <div style={{ marginTop: '10px' }}>
              <p style={{ color: '#a78bfa', marginBottom: '5px' }}>
                <strong>Date:</strong> {event.date || 'N/A'}
              </p>
              <p style={{ color: '#a78bfa', marginBottom: '5px' }}>
                <strong>Venue:</strong> {event.venue || 'N/A'}
              </p>
              <p style={{ color: '#a78bfa', marginBottom: '5px' }}>
                <strong>Quantity:</strong> {ticket.quantity} ticket{ticket.quantity !== 1 ? 's' : ''}
              </p>
              {event.price && (
                <p style={{ color: '#a78bfa', marginBottom: '5px' }}>
                  <strong>Event Price:</strong> {event.price}
                </p>
              )}
            </div>
          </Col>
          <Col md={4} className="text-md-end mt-3 mt-md-0">
            <Badge
              style={{
                backgroundColor: '#8b5cf6',
                fontSize: '0.9rem',
                padding: '8px 15px',
                marginBottom: '10px',
                display: 'block'
              }}
            >
              Confirmed
            </Badge>
            <div style={{ color: '#a78bfa', fontSize: '0.85rem', marginBottom: '10px' }}>
              Registered: {new Date(ticket.purchased_at).toLocaleDateString()}
            </div>
            {onRemove && (
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => onRemove(ticket.id)}
                aria-label={`Remove ticket for ${event.city || 'event'}`}
                style={{
                  borderColor: '#dc3545',
                  color: '#dc3545'
                }}
              >
                Remove
              </Button>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default TicketItem;

