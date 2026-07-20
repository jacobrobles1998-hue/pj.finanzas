import { useState } from 'react'
import { Plus, Tag, TrendingUp, TrendingDown, X, ChevronDown, ChevronUp } from 'lucide-react'

const categoriasIniciales = [
  { id: 1, nombre: 'Ingresos', tipo: 'ingreso' },
  { id: 2, nombre: 'Mercado', tipo: 'gasto' },
  { id: 3, nombre: 'Servicios Públicos', tipo: 'gasto' },
  { id: 4, nombre: 'Bancos', tipo: 'gasto' },
]

const transaccionesEjemplo = [
  { id: 1, categoriaId: 1, descripcion: 'Pago mensualidades', monto: 4200000, fecha: '2026-07-01' },
  { id: 2, categoriaId: 1, descripcion: 'Sesión personal training', monto: 350000, fecha: '2026-07-09' },
  { id: 3, categoriaId: 2, descripcion: 'Mercado semanal', monto: 180000, fecha: '2026-07-03' },
  { id: 4, categoriaId: 2, descripcion: 'Mercado quincenal', monto: 260000, fecha: '2026-07-10' },
  { id: 5, categoriaId: 3, descripcion: 'Factura de luz', monto: 95000, fecha: '2026-07-05' },
  { id: 6, categoriaId: 4, descripcion: 'Cuota tarjeta de crédito', monto: 320000, fecha: '2026-07-08' },
]

const COP = (n) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)

function Categorias() {
  const [categorias, setCategorias] = useState(categoriasIniciales)
  const [transacciones] = useState(transaccionesEjemplo)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [nombre, setNombre] = useState('')
  const [tipo, setTipo] = useState('gasto')
  const [expandidaId, setExpandidaId] = useState(null)

  const gastos = categorias.filter(c => c.tipo === 'gasto')
  const ingresos = categorias.filter(c => c.tipo === 'ingreso')

  const totalPorCategoria = (categoriaId) =>
    transacciones
      .filter(t => t.categoriaId === categoriaId)
      .reduce((sum, t) => sum + t.monto, 0)

  const movimientosPorCategoria = (categoriaId) =>
    transacciones.filter(t => t.categoriaId === categoriaId)

  const toggleExpandir = (id) => {
    setExpandidaId(expandidaId === id ? null : id)
  }

  const crearCategoria = (e) => {
    e.preventDefault()
    if (!nombre.trim()) return

    const nueva = {
      id: Date.now(),
      nombre: nombre.trim(),
      tipo,
    }
    setCategorias([...categorias, nueva])
    setNombre('')
    setTipo('gasto')
    setMostrarForm(false)
  }

  const eliminarCategoria = (id) => {
    setCategorias(categorias.filter(c => c.id !== id))
  }

  const CategoriaItem = ({ cat, color }) => {
    const expandida = expandidaId === cat.id
    const total = totalPorCategoria(cat.id)
    const movimientos = movimientosPorCategoria(cat.id)

    return (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleExpandir(cat.id)}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Tag size={14} className={color} />
            <span className="text-sm font-medium">{cat.nombre}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-semibold ${color}`}>{COP(total)}</span>
            {expandida ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
          </div>
        </button>

        {expandida && (
          <div className="border-t border-gray-100 px-4 py-2">
            {movimientos.length === 0 ? (
              <p className="text-xs text-gray-400 py-2">Sin movimientos todavía</p>
            ) : (
              movimientos.map(mov => (
                <div key={mov.id} className="flex items-center justify-between py-2 text-sm">
                  <div>
                    <p className="text-gray-700">{mov.descripcion}</p>
                    <p className="text-xs text-gray-400">{mov.fecha}</p>
                  </div>
                  <span className={`font-medium ${color}`}>{COP(mov.monto)}</span>
                </div>
              ))
            )}
            <button
              onClick={(e) => { e.stopPropagation(); eliminarCategoria(cat.id) }}
              className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 mt-2"
            >
              <X size={12} /> Eliminar categoría
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categorías</h1>
        <button
          onClick={() => setMostrarForm(!mostrarForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Nueva categoría
        </button>
      </div>

      {mostrarForm && (
        <form onSubmit={crearCategoria} className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex gap-3 mb-3">
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej. Gasolina, Suplementos..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="gasto">Gasto</option>
              <option value="ingreso">Ingreso</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Crear
            </button>
            <button type="button" onClick={() => setMostrarForm(false)} className="text-gray-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={16} className="text-green-600" />
          <h2 className="text-sm uppercase text-gray-500 font-medium">Ingresos</h2>
        </div>
        <div className="space-y-2">
          {ingresos.map(cat => (
            <CategoriaItem key={cat.id} cat={cat} color="text-green-600" />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <TrendingDown size={16} className="text-red-600" />
          <h2 className="text-sm uppercase text-gray-500 font-medium">Gastos</h2>
        </div>
        <div className="space-y-2">
          {gastos.map(cat => (
            <CategoriaItem key={cat.id} cat={cat} color="text-red-600" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Categorias