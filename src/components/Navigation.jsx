import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router';

function Navigation() {
  return (
    <Navbar expand="lg" sticky="top" style={{ backgroundColor: '#000000', borderBottom: '2px solid #8b5cf6' }}>
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: '#8b5cf6', fontWeight: 'bold', fontSize: '1.5rem' }}>
          CIRCUS MAXIMUS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: '#8b5cf6' }} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" style={{ color: '#ffffff' }}>Home</Nav.Link>
            <Nav.Link as={Link} to="/events" style={{ color: '#ffffff' }}>Tour Dates</Nav.Link>
            <Nav.Link as={Link} to="/my-tickets" style={{ color: '#ffffff' }}>My Tickets</Nav.Link>
            <Nav.Link as={Link} to="/purchased" style={{ color: '#ffffff' }}>Purchased</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;


