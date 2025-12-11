import { Card, Badge, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabase';
import CheckoutModal from './CheckoutModal';

const MAX_TICKETS_PER_USER = 8;

function TourCard({ event }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalAttendees, setTotalAttendees] = useState(0);

  useEffect(() => {
    if (event) {
      loadTotalAttendees();
    }
    if (user && event) {
      checkTicketQuantity();
    }
  }, [user, event]);

  const loadTotalAttendees = async () => {
    if (!event) return;

    const { data, error } = await supabase
      .from('ticket_purchases')
      .select('quantity')
      .eq('event_id', event.id);

    if (data && !error) {
      const total = data.reduce((sum, ticket) => sum + (ticket.quantity || 0), 0);
      setTotalAttendees(total);
    } else {
      setTotalAttendees(0);
    }
  };

  const checkTicketQuantity = async () => {
    if (!user || !event) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('ticket_purchases')
      .select('quantity')
      .eq('user_id', user.id)
      .eq('event_id', event.id)
      .maybeSingle();

    if (data && !error) {
      const quantity = data.quantity || 0;
      setCurrentQuantity(quantity);
      setIsLocked(quantity >= MAX_TICKETS_PER_USER);
    } else {
      setCurrentQuantity(0);
      setIsLocked(false);
    }
    setLoading(false);
  };

  const handleBuyClick = () => {
    if (user) {
      if (!isLocked) {
        setShowModal(true);
      }
    } else {
      navigate('/login');
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (user) {
      checkTicketQuantity();
    }
    loadTotalAttendees();
  };

  return (
    <>
      <Card style={{ backgroundColor: '#1a1a1a', border: '2px solid #8b5cf6', color: '#ffffff' }}>
        <Card.Body>
          <Card.Title style={{ color: '#8b5cf6' }}>{event.city}</Card.Title>
          <Badge style={{ backgroundColor: '#6d28d9' }} className="mb-2">CIRCUS MAXIMUS</Badge>
          <Card.Text>
            <strong style={{ color: '#a78bfa' }}>Date:</strong> {event.date}<br />
            <strong style={{ color: '#a78bfa' }}>Venue:</strong> {event.venue}<br />
            <strong style={{ color: '#a78bfa' }}>Price:</strong> {event.price}<br />
            <strong style={{ color: '#8b5cf6' }}>Total Attendees:</strong> {totalAttendees}
          </Card.Text>
          <Button
            style={{
              backgroundColor: isLocked ? '#444444' : '#8b5cf6',
              border: 'none',
              cursor: isLocked ? 'not-allowed' : 'pointer',
              opacity: isLocked ? 0.6 : 1
            }}
            size="sm"
            onClick={handleBuyClick}
            disabled={isLocked || loading}
            aria-label={isLocked ? `Maximum tickets reached: ${currentQuantity} of ${MAX_TICKETS_PER_USER} tickets purchased` : `Buy tickets for ${event.city}`}
          >
            {loading ? 'Loading...' : isLocked ? `Max Tickets (${currentQuantity}/${MAX_TICKETS_PER_USER})` : 'Buy Tickets'}
          </Button>
          {currentQuantity > 0 && !isLocked && (
            <div style={{
              marginTop: '8px',
              fontSize: '0.85rem',
              color: '#a78bfa'
            }}>
              You have {currentQuantity} ticket{currentQuantity !== 1 ? 's' : ''} ({MAX_TICKETS_PER_USER - currentQuantity} remaining)
            </div>
          )}
        </Card.Body>
      </Card>
      <CheckoutModal
        show={showModal}
        onHide={handleModalClose}
        event={event}
        existingQuantity={currentQuantity}
        onSuccess={checkTicketQuantity}
      />
    </>
  );
}

export default TourCard;

