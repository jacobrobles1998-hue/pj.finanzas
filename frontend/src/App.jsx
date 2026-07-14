import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/navbar';
import Dashboard from './pages/Dashboard';
import Categorias from './pages/Categorias';
import Transacciones from './pages/transacciones';
import Cuentas from './pages/Cuentas';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Categorias" element={<Categorias />} />
        <Route path="/Transacciones" element={<Transacciones />} />
        <Route path="/cuentas" element={<Cuentas />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
