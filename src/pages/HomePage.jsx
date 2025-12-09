import { Container, Row, Col } from 'react-bootstrap';
import Countdown from '../components/Countdown';
import InfoCard from '../components/InfoCard';
import { useAuth } from '../contexts/AuthContext';

function HomePage() {
  const { user } = useAuth();

  return (
    <Container className="my-5">
      <Row className="mb-4 text-center">
        <Col>
          <h1 style={{ color: '#8b5cf6', fontSize: '3rem', fontWeight: 'bold' }}>CIRCUS MAXIMUS TOUR</h1>
          <p className="lead" style={{ color: '#a78bfa', fontSize: '1.5rem' }}>Travis Scott • 2025</p>
          <p style={{ color: '#ffffff' }}>Experience the ultimate live performance</p>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col>
          <Countdown />
        </Col>
      </Row>
      
      <Row>
        <Col md={user ? 4 : 12} className="mb-3">
          <InfoCard 
            title="Tour Dates"
            description="Check out upcoming tour dates and find a show near you."
            buttonText="View Dates"
          />
        </Col>
        
        {user && (
          <>
            <Col md={4} className="mb-3">
              <InfoCard 
                title="My Tickets"
                description="View and manage your saved tickets all in one place."
                buttonText="My Tickets"
              />
            </Col>
            
            <Col md={4} className="mb-3">
              <InfoCard 
                title="Order History"
                description="Review your past purchases and download tickets."
                buttonText="View Orders"
              />
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
}

export default HomePage;

