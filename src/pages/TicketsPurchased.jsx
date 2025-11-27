import { Container, ListGroup } from 'react-bootstrap';
import PurchaseItem from '../components/PurchaseItem';

function TicketsPurchased() {
  const purchases = [
    { id: 1, event: "Los Angeles, CA", date: "December 15, 2024", venue: "Crypto.com Arena", qty: 2, total: "$300", status: "Confirmed" },
    { id: 2, event: "Houston, TX", date: "December 22, 2024", venue: "Toyota Center", qty: 1, total: "$145", status: "Confirmed" }
  ];
// change
  return (
    <Container className="my-5">
      <h1 className="mb-4" style={{ color: '#8b5cf6' }}>TICKETS PURCHASED</h1>
      <p className="mb-4" style={{ color: '#ffffff' }}>View your purchased CIRCUS MAXIMUS tickets</p>
      
      <ListGroup>
        {purchases.map(purchase => (
          <PurchaseItem 
            key={purchase.id}
            event={purchase.event}
            date={purchase.date}
            venue={purchase.venue}
            qty={purchase.qty}
            total={purchase.total}
            status={purchase.status}
          />
        ))}
      </ListGroup>
    </Container>
  );
}

export default TicketsPurchased;

