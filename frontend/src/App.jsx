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
      <div className="pt-32 px-6 pb-6">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categoria" element={<Categorias />} />
        <Route path="/transacciones" element={<Transacciones />} />
        <Route path="/cuentas" element={<Cuentas />} />
      </Routes>
      </div>
    </BrowserRouter>
  )
}
export default App
