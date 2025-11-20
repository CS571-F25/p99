import { HashRouter, Routes, Route } from 'react-router'
import './App.css'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import EventSchedule from './pages/EventSchedule'
import MyTickets from './pages/MyTickets'
import TicketsPurchased from './pages/TicketsPurchased'

function App() {
  return <HashRouter>
    <Navigation />
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/events" element={<EventSchedule />}></Route>
      <Route path="/my-tickets" element={<MyTickets />}></Route>
      <Route path="/purchased" element={<TicketsPurchased />}></Route>
    </Routes>
  </HashRouter>
}

export default App
