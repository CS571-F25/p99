import { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    const { data, error } = await signUp(email, password, name);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      if (data?.user) {
        setSuccess('Registration midway, Confirm email to complete registration.');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setSuccess('Account created! Please check your email to verify your account before logging in.');
        setLoading(false);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    }
  };

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card style={{
        backgroundColor: '#1a1a1a',
        border: '2px solid #8b5cf6',
        color: '#ffffff',
        width: '100%',
        maxWidth: '500px'
      }}>
        <Card.Body className="p-4">
          <h2 className="text-center mb-4" style={{ color: '#8b5cf6' }}>SIGN UP</h2>
          <p className="text-center mb-4" style={{ color: '#a78bfa' }}>
            Join the Circus Maximus Tour
          </p>

          {error && (
            <Alert variant="danger" style={{ backgroundColor: '#dc3545', border: 'none' }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert variant="success" style={{ backgroundColor: '#198754', border: 'none' }}>
              {success}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label htmlFor="name" style={{ color: '#a78bfa' }}>Name</Form.Label>
              <Form.Control
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                aria-label="Full name"
                onChange={(e) => setName(e.target.value)}
                style={{
                  backgroundColor: '#000000',
                  border: '1px solid #8b5cf6',
                  color: '#ffffff'
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label htmlFor="email" style={{ color: '#a78bfa' }}>Email</Form.Label>
              <Form.Control
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                aria-label="Email address"
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  backgroundColor: '#000000',
                  border: '1px solid #8b5cf6',
                  color: '#ffffff'
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label htmlFor="password" style={{ color: '#a78bfa' }}>Password</Form.Label>
              <Form.Control
                id="password"
                type="password"
                placeholder="Enter your password (min 6 characters)"
                value={password}
                aria-label="Password"
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  backgroundColor: '#000000',
                  border: '1px solid #8b5cf6',
                  color: '#ffffff'
                }}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="confirmPassword">
              <Form.Label htmlFor="confirmPassword" style={{ color: '#a78bfa' }}>Confirm Password</Form.Label>
              <Form.Control
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                aria-label="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  backgroundColor: '#000000',
                  border: '1px solid #8b5cf6',
                  color: '#ffffff'
                }}
              />
            </Form.Group>

            <Button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: '#8b5cf6',
                border: 'none',
                width: '100%',
                padding: '10px'
              }}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </Form>

          <div className="text-center mt-4">
            <p style={{ color: '#ffffff' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#8b5cf6', textDecoration: 'none' }}>
                Login
              </Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Signup;

