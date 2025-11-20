import { Container, Table, Button, Alert } from 'react-bootstrap';

function MyTickets() {
  return (
    <Container className="my-5">
      <h1 className="mb-4" style={{ color: '#8b5cf6' }}>MY TICKETS</h1>
      
      <Alert style={{ backgroundColor: '#1a1a1a', border: '1px solid #8b5cf6', color: '#ffffff' }}>
        You have no saved tickets yet. Browse tour dates to add tickets to your collection!
      </Alert>
      
      <Table bordered hover style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>
        <thead style={{ backgroundColor: '#8b5cf6' }}>
          <tr>
            <th>City</th>
            <th>Date</th>
            <th>Venue</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="4" className="text-center" style={{ color: '#a78bfa' }}>
              No tickets saved
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default MyTickets;

