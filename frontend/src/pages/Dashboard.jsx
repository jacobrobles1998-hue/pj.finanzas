import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

// Datos de ejemplo — luego los vamos a traer del backend con axios
const transaccionesEjemplo = [
  { id: 1, categoria: 'Ingresos', monto: 4200000 },
  { id: 2, categoria: 'Arriendo', monto: -1100000 },
  { id: 3, categoria: 'Alimentación', monto: -260000 },
  { id: 4, categoria: 'Transporte', monto: -90000 },
  { id: 5, categoria: 'Suplementos', monto: -220000 },
]

const COP = (n) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)

function Dashboard() {
  const [transacciones] = useState(transaccionesEjemplo)

  const ingresos = transacciones.filter(t => t.monto > 0).reduce((s, t) => s + t.monto, 0)
  const gastos = transacciones.filter(t => t.monto < 0).reduce((s, t) => s + t.monto, 0)
  const saldo = ingresos + gastos

  const porCategoria = transacciones
    .filter(t => t.monto < 0)
    .map(t => ({ categoria: t.categoria, total: Math.abs(t.monto) }))

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Tarjetas de resumen */}
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

      {/* Gráfico de gastos por categoría */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h2 className="text-sm uppercase text-gray-500 mb-4">Gastos por categoría</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={porCategoria}>
            <CartesianGrid stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="categoria" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000}k`} />
            <Tooltip formatter={(v) => COP(v)} />
            <Bar dataKey="total" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Dashboard