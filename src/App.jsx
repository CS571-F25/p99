import { HashRouter, Routes, Route } from 'react-router'
import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import EventSchedule from './pages/EventSchedule'
import MyTickets from './pages/MyTickets'
import TicketsPurchased from './pages/TicketsPurchased'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  return <HashRouter>
    <AuthProvider>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/events" element={<EventSchedule />}></Route>
        <Route path="/my-tickets" element={<MyTickets />}></Route>
        <Route path="/purchased" element={<TicketsPurchased />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </AuthProvider>
  </HashRouter>
}

export default App
