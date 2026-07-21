import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/layout/navbar'
import Login from './pages/login'
import Dashboard from './pages/Dashboard'
import Categorias from './pages/Categorias'
import Transacciones from './pages/transacciones'
import Cuentas from './pages/Cuentas'
import './App.css'

function RutaProtegida({ children }) {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={
          <RutaProtegida><Navbar /><div className="pt-32 px-6 pb-6"><Dashboard /></div></RutaProtegida>
        } />
        <Route path="/categoria" element={
          <RutaProtegida><Navbar /><div className="pt-32 px-6 pb-6"><Categorias /></div></RutaProtegida>
        } />
        <Route path="/transacciones" element={
          <RutaProtegida><Navbar /><div className="pt-32 px-6 pb-6"><Transacciones /></div></RutaProtegida>
        } />
        <Route path="/cuentas" element={
          <RutaProtegida><Navbar /><div className="pt-32 px-6 pb-6"><Cuentas /></div></RutaProtegida>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App