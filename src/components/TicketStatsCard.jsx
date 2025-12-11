import { Card, Row, Col } from 'react-bootstrap';

function TicketStatsCard({ tickets }) {
  if (!tickets || tickets.length === 0) {
    return null;
  }

  const totalTickets = tickets.reduce((sum, ticket) => sum + (ticket.quantity || 0), 0);
  const uniqueEvents = new Set(tickets.map(ticket => ticket.event_id)).size;
  const mostRecent = tickets.length > 0 && tickets[0].purchased_at
    ? new Date(tickets[0].purchased_at)
    : null;

  return (
    <Card style={{
      backgroundColor: '#1a1a1a',
      border: '2px solid #8b5cf6',
      color: '#ffffff',
      marginBottom: '25px'
    }}>
      <Card.Body>
        <Row className="text-center">
          <Col md={4}>
            <div style={{ fontSize: '2rem', color: '#8b5cf6', fontWeight: 'bold' }}>
              {totalTickets}
            </div>
            <div style={{ color: '#a78bfa', fontSize: '0.9rem' }}>
              Total Tickets
            </div>
          </Col>
          <Col md={4}>
            <div style={{ fontSize: '2rem', color: '#8b5cf6', fontWeight: 'bold' }}>
              {uniqueEvents}
            </div>
            <div style={{ color: '#a78bfa', fontSize: '0.9rem' }}>
              Unique Events
            </div>
          </Col>
          <Col md={4}>
            <div style={{ fontSize: '1.2rem', color: '#8b5cf6', fontWeight: 'bold' }}>
              {mostRecent ? mostRecent.toLocaleDateString() : 'N/A'}
            </div>
            <div style={{ color: '#a78bfa', fontSize: '0.9rem' }}>
              Last Purchase
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default TicketStatsCard;

