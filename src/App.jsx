import { HashRouter, Routes, Route } from 'react-router'
import './App.css'
import Home from './components/Home'
import AboutUs from './components/AboutUs'

function App() {
  return <HashRouter>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/about" element={<AboutUs />}></Route>
    </Routes>
  </HashRouter>
}

export default App
