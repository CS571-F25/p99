import { Container, Row, Col } from 'react-bootstrap';
import TourCard from '../components/TourCard';

function EventSchedule() {
  const events = [
    { id: 1, city: "Los Angeles, CA", date: "December 15, 2024", venue: "Crypto.com Arena", price: "$150" },
    { id: 2, city: "Houston, TX", date: "December 22, 2024", venue: "Toyota Center", price: "$145" },
    { id: 3, city: "New York, NY", date: "January 5, 2025", venue: "Madison Square Garden", price: "$175" },
    { id: 4, city: "Tokyo, Japan", date: "November 8, 2025", venue: "United Center", price: "$155" },
    { id: 5, city: "Abu Dhabi, UAE", date: "November 15, 2025", venue: "FTX Arena", price: "$160" },
    { id: 6, city: "Mumbai, India", date: "November 19, 2025", venue: "State Farm Arena", price: "$150" }
  ];

  return (
    <Container className="my-5">
      <h1 className="mb-4" style={{ color: '#8b5cf6' }}>CIRCUS MAXIMUS TOUR DATES</h1>
      <p className="mb-4" style={{ color: '#ffffff' }}>Get your tickets now for the show of a lifetime</p>
      
      <Row>
        {events.map(event => (
          <Col md={4} key={event.id} className="mb-3">
            <TourCard 
              city={event.city}
              date={event.date}
              venue={event.venue}
              price={event.price}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default EventSchedule;

