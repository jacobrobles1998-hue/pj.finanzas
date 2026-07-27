import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { cargarDeStorage } from '../utils/storage'

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

function Dashboard() {
  const [categorias] = useState(() => cargarDeStorage('finanzas_categorias', categoriasIniciales))
  const [transacciones] = useState(() => cargarDeStorage('finanzas_transacciones', transaccionesEjemplo))

  const ingresos = transacciones.filter(t => t.monto > 0).reduce((s, t) => s + t.monto, 0)
  const gastos = transacciones.filter(t => t.monto < 0).reduce((s, t) => s + t.monto, 0)
  const saldo = ingresos + gastos

  const porCategoria = categorias
    .filter(cat => cat.tipo === 'gasto')
    .map(cat => {
      const total = transacciones
        .filter(t => t.categoriaId === cat.id)
        .reduce((sum, t) => sum + Math.abs(t.monto), 0)
      return { categoria: cat.nombre, total }
    })
    .filter(c => c.total > 0)

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs uppercase text-gray-500">Ingresos</span>
            <ArrowUpRight size={16} className="text-green-600" />
          </div>
          <p className="text-xl font-semibold text-green-600">{COP(ingresos)}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs uppercase text-gray-500">Gastos</span>
            <ArrowDownRight size={16} className="text-red-600" />
          </div>
          <p className="text-xl font-semibold text-red-600">{COP(gastos)}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <span className="text-xs uppercase text-gray-500">Balance</span>
          <p className={`text-xl font-semibold ${saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {COP(saldo)}
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h2 className="text-sm uppercase text-gray-500 mb-4">Gastos por categoría</h2>
        {porCategoria.length === 0 ? (
          <p className="text-sm text-gray-400 py-8 text-center">Todavía no hay gastos registrados</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={porCategoria}>
              <CartesianGrid stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="categoria" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip formatter={(v) => COP(v)} />
              <Bar dataKey="total" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

export default Dashboard