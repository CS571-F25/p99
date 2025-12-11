import { Container, Row, Col } from 'react-bootstrap';
import TourCard from '../components/TourCard';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase';

function EventSchedule() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    async function loadEvents() {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching events:", error);
      } else {
        setEvents(data);
      }
    }

    loadEvents();
  }, []);
  return (
    <Container className="my-5">
      <h1 className="mb-4" style={{ color: '#8b5cf6' }}>CIRCUS MAXIMUS TOUR DATES</h1>
      <p className="mb-4" style={{ color: '#ffffff' }}>Get your tickets now for the show of a lifetime</p>
      
      <Row>
        {events.map(event => (
          <Col md={4} key={event.id} className="mb-3">
            <TourCard 
              event={event}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default EventSchedule;

