import { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    setLoading(true);

    const { data, error } = await signIn(email, password);

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please check your credentials or verify your email if you just signed up.');
      } else if (error.message.includes('Email not confirmed')) {
        setError('Please verify your email before logging in. Check your inbox for the verification link.');
      } else {
        setError(error.message);
      }
      setLoading(false);
    } else {
      navigate('/');
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
          <h2 className="text-center mb-4" style={{ color: '#8b5cf6' }}>LOGIN</h2>
          <p className="text-center mb-4" style={{ color: '#a78bfa' }}>
            Welcome back to Circus Maximus Tour
          </p>

          {error && (
            <Alert variant="danger" style={{ backgroundColor: '#dc3545', border: 'none' }}>
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
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

            <Form.Group className="mb-4" controlId="password">
              <Form.Label htmlFor="password" style={{ color: '#a78bfa' }}>Password</Form.Label>
              <Form.Control
                id="password"
                type="password"
                placeholder="Enter your password"
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
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>

          <div className="text-center mt-4">
            <p style={{ color: '#ffffff' }}>
              Don&apos;t have an account?{' '}
              <Link to="/signup" style={{ color: '#8b5cf6', textDecoration: 'none' }}>
                Sign Up
              </Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;

