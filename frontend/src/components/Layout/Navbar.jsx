import { useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, ArrowLeftRight, Tag, Wallet } from 'lucide-react'
import '../styles/estilo_b_f_.css'

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transacciones', label: 'Transacciones', icon: ArrowLeftRight },
  { to: '/categorias', label: 'Categoria', icon: Tag },
  { to: '/cuentas', label: 'Cuentas', icon: Wallet },
]

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className="navbar-float">
      {links.map(({ to, label, icon: Icon }) => {
        const active = location.pathname === to
        return (
          <button
            key={to}
            onClick={() => navigate(to)}
            className={`navbar-link ${active ? 'navbar-link-active' : ''}`}
          >
            <Icon size={16} />
            <span className="navbar-label">{label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export default Navbar