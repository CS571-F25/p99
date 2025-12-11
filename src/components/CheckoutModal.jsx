import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, InputGroup } from 'react-bootstrap';
import { supabase } from '../supabase';

const MAX_TICKETS_PER_USER = 8;

function CheckoutModal({ show, onHide, event, existingQuantity = 0, onSuccess }) {
  const [quantity, setQuantity] = useState(1);
  const [albumAnswer, setAlbumAnswer] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (show && !success) {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 3 + 2
      }));
      setParticles(newParticles);
    }
  }, [show, success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!albumAnswer.trim()) {
      setError('Please answer the verification question!');
      return;
    }

    const answerLower = albumAnswer.toLowerCase().trim();
    const validAnswers = ['astroworld', 'astro world', 'astro', 'astroworlds', 'astroworld album'];
    const isValid = validAnswers.some(valid =>
      answerLower.includes(valid.toLowerCase()) ||
      valid.toLowerCase().includes(answerLower)
    );

    if (!isValid) {
      setError('Hmm, that doesn\'t sound right. Think of Travis Scott\'s most streamed album! 💜');
      return;
    }

    if (!email.trim()) {
      setError('Please enter your email!');
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setError('You must be logged in to purchase tickets');
        setLoading(false);
        return;
      }

      const { data: existingTickets, error: checkError } = await supabase
        .from('ticket_purchases')
        .select('id, quantity')
        .eq('user_id', user.id)
        .eq('event_id', event.id)
        .maybeSingle();

      let finalQuantity = quantity;
      let data;
      let insertError;

      if (existingTickets && !checkError) {
        finalQuantity = existingTickets.quantity + quantity;

        if (finalQuantity > MAX_TICKETS_PER_USER) {
          throw new Error(`You already have ${existingTickets.quantity} ticket(s) for this event. Maximum ${MAX_TICKETS_PER_USER} tickets per user per event. You can add ${MAX_TICKETS_PER_USER - existingTickets.quantity} more.`);
        }

        const { data: updateData, error: updateError } = await supabase
          .from('ticket_purchases')
          .update({
            quantity: finalQuantity,
            purchased_at: new Date().toISOString()
          })
          .eq('id', existingTickets.id)
          .select();

        data = updateData;
        insertError = updateError;
      } else {
        if (quantity > MAX_TICKETS_PER_USER) {
          throw new Error(`Maximum ${MAX_TICKETS_PER_USER} tickets per user per event. Please select ${MAX_TICKETS_PER_USER} or fewer.`);
        }

        const { data: insertData, error: createError } = await supabase
          .from('ticket_purchases')
          .insert([
            {
              user_id: user.id,
              event_id: event.id,
              quantity: quantity,
              total_price: 0,
              purchased_at: new Date().toISOString()
            }
          ])
          .select();

        data = insertData;
        insertError = createError;
      }

      if (insertError) {
        throw insertError;
      }

      setSuccess(true);
      setTimeout(() => {
        onHide();
        setSuccess(false);
        setQuantity(1);
        setAlbumAnswer('');
        setEmail('');
        if (onSuccess) {
          onSuccess();
        }
      }, 2500);
    } catch (err) {
      setError(err.message || 'Failed to complete purchase. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading && !success) {
      onHide();
      setQuantity(1);
      setAlbumAnswer('');
      setEmail('');
      setError('');
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="lg"
      style={{ color: '#ffffff' }}
    >
      <Modal.Header
        closeButton
        style={{
          backgroundColor: '#1a1a1a',
          borderBottom: '2px solid #8b5cf6',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent)',
          animation: 'shimmer 2s infinite',
          pointerEvents: 'none'
        }} />
        <Modal.Title style={{ color: '#8b5cf6', position: 'relative', zIndex: 1 }}>
          🔥 Register for CIRCUS MAXIMUS 🔥
        </Modal.Title>
        <style>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.05); }
          }
          @keyframes particle {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
          }
        `}</style>
      </Modal.Header>
      <Modal.Body style={{
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '400px'
      }}>
        {!success && particles.map(particle => (
          <div
            key={particle.id}
            style={{
              position: 'absolute',
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: '#8b5cf6',
              borderRadius: '50%',
              opacity: 0.6,
              animation: `particle ${particle.duration}s infinite linear`,
              pointerEvents: 'none',
              boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
            }}
          />
        ))}

        {success ? (
          <div className="text-center py-5" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
              fontSize: '5rem',
              animation: 'float 2s ease-in-out infinite',
              marginBottom: '20px'
            }}>
              🎉
            </div>
            <h2 style={{
              color: '#8b5cf6',
              fontSize: '2rem',
              marginBottom: '15px',
              animation: 'pulse 1.5s ease-in-out infinite',
              textShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
            }}>
              Registration Confirmed!
            </h2>
            <div style={{
              backgroundColor: '#000000',
              border: '2px solid #8b5cf6',
              borderRadius: '12px',
              padding: '20px',
              marginTop: '20px',
              boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)'
            }}>
              <p style={{ color: '#a78bfa', fontSize: '1.1rem', marginBottom: '10px' }}>
                <strong>Event:</strong> {event?.city}
              </p>
              <p style={{ color: '#a78bfa', fontSize: '1.1rem', marginBottom: '10px' }}>
                <strong>Attendees:</strong> {quantity}
              </p>
              <p style={{ color: '#a78bfa', fontSize: '0.9rem' }}>
                Confirmation sent to {email}
              </p>
            </div>
            <div style={{
              marginTop: '30px',
              fontSize: '3rem',
              animation: 'pulse 1s ease-in-out infinite'
            }}>
              🔥
            </div>
          </div>
        ) : (
          <>
            <div style={{
              background: 'linear-gradient(135deg, #000000 0%, #1a0a2e 100%)',
              border: '2px solid #8b5cf6',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '25px',
              position: 'relative',
              zIndex: 2,
              boxShadow: '0 0 25px rgba(139, 92, 246, 0.3)',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
                borderRadius: '50%'
              }} />
              <h2 style={{
                color: '#8b5cf6',
                marginBottom: '15px',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                textShadow: '0 0 10px rgba(139, 92, 246, 0.5)',
                position: 'relative',
                zIndex: 1
              }}>
                {event?.city}
              </h2>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <p style={{ color: '#a78bfa', marginBottom: '8px', fontSize: '1rem' }}>
                  <strong style={{ color: '#c4b5fd' }}>📅 Date:</strong> {event?.date}
                </p>
                <p style={{ color: '#a78bfa', fontSize: '1rem' }}>
                  <strong style={{ color: '#c4b5fd' }}>📍 Venue:</strong> {event?.venue}
                </p>
              </div>
            </div>

            {error && (
              <Alert variant="danger" style={{ backgroundColor: '#dc3545', border: 'none', color: '#ffffff' }}>
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="attendees-input" style={{ color: '#a78bfa' }}>Number of Attendees</Form.Label>
                {existingQuantity > 0 && (
                  <div style={{
                    marginBottom: '10px',
                    padding: '8px',
                    backgroundColor: '#000000',
                    border: '1px solid #8b5cf6',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    color: '#a78bfa'
                  }}>
                    You already have {existingQuantity} ticket{existingQuantity !== 1 ? 's' : ''} for this event
                    <br />
                    Maximum {MAX_TICKETS_PER_USER} tickets per user. You can add up to {MAX_TICKETS_PER_USER - existingQuantity} more.
                  </div>
                )}
                <InputGroup>
                  <Button
                    variant="outline-secondary"
                    type="button"
                    aria-label="Decrease number of attendees"
                    style={{
                      backgroundColor: '#000000',
                      border: '1px solid #8b5cf6',
                      color: '#ffffff'
                    }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={loading}
                  >
                    -
                  </Button>
                  <Form.Control
                    id="attendees-input"
                    type="number"
                    min="1"
                    max={MAX_TICKETS_PER_USER - existingQuantity}
                    value={quantity}
                    aria-label="Number of attendees"
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      const maxAllowed = MAX_TICKETS_PER_USER - existingQuantity;
                      setQuantity(Math.max(1, Math.min(maxAllowed, val)));
                    }}
                    style={{
                      backgroundColor: '#000000',
                      border: '1px solid #8b5cf6',
                      color: '#ffffff',
                      textAlign: 'center'
                    }}
                    disabled={loading}
                  />
                  <Button
                    variant="outline-secondary"
                    type="button"
                    aria-label="Increase number of attendees"
                    style={{
                      backgroundColor: '#000000',
                      border: '1px solid #8b5cf6',
                      color: '#ffffff'
                    }}
                    onClick={() => {
                      const maxAllowed = MAX_TICKETS_PER_USER - existingQuantity;
                      setQuantity(Math.min(maxAllowed, quantity + 1));
                    }}
                    disabled={loading || (existingQuantity + quantity >= MAX_TICKETS_PER_USER)}
                  >
                    +
                  </Button>
                </InputGroup>
                <Form.Text style={{ color: '#a78bfa', fontSize: '0.85rem' }}>
                  Max {MAX_TICKETS_PER_USER - existingQuantity} additional ticket{MAX_TICKETS_PER_USER - existingQuantity !== 1 ? 's' : ''} allowed
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="email-input" style={{ color: '#a78bfa' }}>
                  Email for confirmation
                </Form.Label>
                <Form.Control
                  id="email-input"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  aria-label="Email for confirmation"
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    backgroundColor: '#000000',
                    border: '1px solid #8b5cf6',
                    color: '#ffffff'
                  }}
                  disabled={loading}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label htmlFor="album-answer-input" style={{ color: '#a78bfa' }}>
                  🔐 Security Check: What is Travis Scott's most streamed album? 💜
                </Form.Label>
                <Form.Control
                  id="album-answer-input"
                  type="text"
                  placeholder="Enter album name..."
                  value={albumAnswer}
                  aria-label="Security check answer: Travis Scott's most streamed album"
                  onChange={(e) => setAlbumAnswer(e.target.value)}
                  style={{
                    backgroundColor: '#000000',
                    border: '1px solid #8b5cf6',
                    color: '#ffffff'
                  }}
                  disabled={loading}
                  required
                />
                <Form.Text style={{ color: '#a78bfa', fontSize: '0.85rem' }}>
                  Just making sure you're a real fan! 😎
                </Form.Text>
              </Form.Group>

              <Button
                type="submit"
                disabled={loading}
                style={{
                  background: loading
                    ? 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)'
                    : 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
                  border: 'none',
                  width: '100%',
                  padding: '15px',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  position: 'relative',
                  zIndex: 2,
                  boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'scale(1.02)';
                    e.target.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.6)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.4)';
                }}
              >
                {loading ? (
                  <span>
                    <span style={{ animation: 'pulse 1s infinite' }}>Registering</span> 🔥
                  </span>
                ) : (
                  'Register for Event 🔥'
                )}
              </Button>
            </Form>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default CheckoutModal;

