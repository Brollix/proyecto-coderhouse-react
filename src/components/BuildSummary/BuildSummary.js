import React from 'react'
import { Link } from 'react-router-dom'
import { useBuild } from '../../context/BuildContext'
import './BuildSummary.css'
import { useDollarRate } from '../../hooks/useDollarRate'

export const BuildSummary = () => {
  const { build, total, removePart, clearBuild } = useBuild()
  const types = ['CPU', 'Motherboard', 'RAM']
  const isComplete = types.every((t) => !!build[t])
  const { rate: usdArsRate } = useDollarRate()
  const totalArs = typeof usdArsRate === 'number' && Number.isFinite(usdArsRate)
    ? Math.round(Number(total) * usdArsRate)
    : null

  return (
    <div className="build">
      <div className="build-header">
        <h2>tu armado</h2>
        <div className="build-actions">
          {!isComplete && Object.values(build).length > 0 && (
            <Link to="/productos" className="btn-secondary" style={{ textDecoration: 'none' }}>seguir agregando</Link>
          )}
          {Object.values(build).length > 0 && (
            <button className="btn-secondary" onClick={clearBuild}>vaciar</button>
          )}
        </div>
      </div>

      {Object.values(build).length === 0 ? (
        <div className="build-empty">
          <p>no agregaste componentes aún.</p>
          <Link to="/home" className="btn-add" style={{ textDecoration: 'none' }}>empezar</Link>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="build-table">
            <thead>
              <tr>
                <th>tipo</th>
                <th>producto</th>
                <th>socket</th>
                <th>precio</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {types.map((t) => {
                const p = build[t]
                // Compute navigate link preserving compatibility
                let to = `/productos/${t}`
                if (t === 'Motherboard' && build.CPU?.socket) {
                  const s = encodeURIComponent(build.CPU.socket)
                  to = `/productos/Motherboard?socket=${s}`
                }
                if (t === 'RAM' && build.Motherboard?.memoria) {
                  const m = encodeURIComponent(build.Motherboard.memoria)
                  to = `/productos/RAM?mem=${m}`
                }
                return (
                  <tr key={t}>
                    <td>{t}</td>
                    <td>{p ? `${p.marca} ${p.serie}` : <span style={{ color: '#666' }}>—</span>}</td>
                    <td>{p ? (t === 'RAM' ? (p.memoria || '-') : (p.socket || '-')) : <span style={{ color: '#666' }}>—</span>}</td>
                    <td>
                      {p ? (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span>usd ${p.precio}</span>
                          {usdArsRate && (
                            <span style={{ color: '#444' }}>ar$ {(Number(p.precio) * usdArsRate).toLocaleString('es-AR', { maximumFractionDigits: 0 })}</span>
                          )}
                        </div>
                      ) : (
                        <span style={{ color: '#666' }}>—</span>
                      )}
                    </td>
                    <td>
                      {p ? (
                        <button className="btn-secondary" onClick={() => removePart(t)}>quitar</button>
                      ) : (
                        <Link to={to} className="btn-add" style={{ textDecoration: 'none' }}>elegir</Link>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="total-label">total</td>
                <td className="total-value">
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span>usd ${total}</span>
                    {totalArs && (
                      <span style={{ color: '#444' }}>ar$ {totalArs.toLocaleString('es-AR', { maximumFractionDigits: 0 })}</span>
                    )}
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {Object.values(build).length > 0 && (
        <div className="build-footer">
          <Link to="/pago" className="btn-add" style={{ textDecoration: 'none' }}>continuar a pagar</Link>
        </div>
      )}
    </div>
  )
}
