import { Container, Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabase';
import TicketItem from '../components/TicketItem';
import TicketStatsCard from '../components/TicketStatsCard';

function MyTickets() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function loadTickets() {
      const { data, error } = await supabase
        .from('ticket_purchases')
        .select(`
          *,
          events (
            id,
            city,
            date,
            venue,
            price
          )
        `)
        .eq('user_id', user.id)
        .order('purchased_at', { ascending: false });

      if (error) {
        console.error('Error fetching tickets:', error);
      } else {
        setTickets(data || []);
      }
      setLoading(false);
    }

    loadTickets();
  }, [user]);

  const handleRemove = async (ticketId) => {
    const { error } = await supabase
      .from('ticket_purchases')
      .delete()
      .eq('id', ticketId);

    if (error) {
      console.error('Error removing ticket:', error);
      alert('Failed to remove ticket. Please try again.');
    } else {
      setTickets(tickets.filter(ticket => ticket.id !== ticketId));
    }
  };

  if (!user) {
    return (
      <Container className="my-5">
        <h1 className="mb-4" style={{ color: '#8b5cf6' }}>MY TICKETS</h1>
        <Alert style={{ backgroundColor: '#1a1a1a', border: '1px solid #8b5cf6', color: '#ffffff' }}>
          Please <a href="#/login" style={{ color: '#8b5cf6' }}>login</a> to view your tickets.
        </Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="my-5">
        <h1 className="mb-4" style={{ color: '#8b5cf6' }}>MY TICKETS</h1>
        <Alert style={{ backgroundColor: '#1a1a1a', border: '1px solid #8b5cf6', color: '#ffffff' }}>
          Loading your tickets...
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4" style={{ color: '#8b5cf6' }}>MY TICKETS</h1>

      {tickets.length === 0 ? (
        <Alert style={{ backgroundColor: '#1a1a1a', border: '1px solid #8b5cf6', color: '#ffffff' }}>
          You have no tickets yet. Browse <a href="#/events" style={{ color: '#8b5cf6' }}>tour dates</a> to purchase tickets!
        </Alert>
      ) : (
        <>
          <TicketStatsCard tickets={tickets} />
          <p style={{ color: '#a78bfa', marginBottom: '20px' }}>
            You have {tickets.length} registration{tickets.length !== 1 ? 's' : ''} in your collection
          </p>
          {tickets.map(ticket => (
            <TicketItem
              key={ticket.id}
              ticket={ticket}
              onRemove={handleRemove}
            />
          ))}
        </>
      )}
    </Container>
  );
}

export default MyTickets;

