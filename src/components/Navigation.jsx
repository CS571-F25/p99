import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

function Navigation() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

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
            {user && (
              <>
                <Nav.Link as={Link} to="/my-tickets" style={{ color: '#ffffff' }}>My Tickets</Nav.Link>
                <Nav.Link as={Link} to="/purchased" style={{ color: '#ffffff' }}>Purchased</Nav.Link>
              </>
            )}
            
            {user ? (
              <div className="d-flex align-items-center ms-3">
                <span style={{ color: '#a78bfa', marginRight: '15px' }}>
                  {user.user_metadata?.name || user.email}
                </span>
                <Button
                  onClick={handleLogout}
                  size="sm"
                  className="nav-button-outline"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="d-flex ms-3 gap-2">
                <Button
                  as={Link}
                  to="/login"
                  size="sm"
                  className="nav-button-outline"
                >
                  Login
                </Button>
                <Button
                  as={Link}
                  to="/signup"
                  size="sm"
                  className="nav-button-solid"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;


