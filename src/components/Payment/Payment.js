import React, { useMemo, useState } from 'react'
import emailjs from '@emailjs/browser'
import { useBuild } from '../../context/BuildContext'
import { useDollarRate } from '../../hooks/useDollarRate'
import { Link, useNavigate } from 'react-router-dom'
import './Payment.css'

export const Payment = () => {
  const { build, total, clearBuild } = useBuild()
  const { rate: usdArsRate } = useDollarRate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [emailConfirm, setEmailConfirm] = useState('')
  const navigate = useNavigate()

  const items = useMemo(() => {
    const required = ['CPU', 'Motherboard', 'RAM']
    return required
      .filter((t) => !!build[t])
      .map((t) => ({
        tipo: t,
        nombre: `${build[t].marca} ${build[t].serie}`,
        precio: Number(build[t].precio) || 0,
      }))
  }, [build])

  const totalArs = typeof usdArsRate === 'number' && Number.isFinite(usdArsRate)
    ? Math.round(Number(total) * usdArsRate)
    : null

  const emailsMatch = email.trim() !== '' && emailConfirm.trim() !== '' && email.trim() === emailConfirm.trim()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Validar confirmación de email
    if (email.trim() !== emailConfirm.trim()) {
      alert('los emails no coinciden')
      return
    }

    // Armar datos del mail
    const lines = []
    lines.push(`hola ${name},`)
    lines.push('gracias por tu compra en monte crypto. este es el resumen de tu armado:')
    lines.push('')
    items.forEach((it) => {
      lines.push(`- ${it.tipo}: ${it.nombre} — usd $${it.precio}`)
    })
    lines.push('')
    lines.push(`total: usd $${total}`)
    if (typeof usdArsRate === 'number' && Number.isFinite(usdArsRate)) {
      const ars = Math.round(Number(total) * usdArsRate).toLocaleString('es-AR', { maximumFractionDigits: 0 })
      lines.push(`total aprox en ar$: ${ars}`)
    }

    const templateParams = {
      to_email: email,
      to_name: name,
      subject: 'tu armado monte crypto',
      message: lines.join('\n'),
    }

    const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID
    const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
        publicKey: PUBLIC_KEY,
      })
      alert(`gracias ${name}! te enviamos el resumen a ${email}.`)
      clearBuild()
      navigate('/home')
    } catch (err) {
      console.error('emailjs error:', err)
      alert('no pudimos enviar el mail automáticamente. intentá nuevamente más tarde.')
    }
  }

  if (items.length === 0) {
    return (
      <div className="payment">
        <h2>pago</h2>
        <div className="payment-card">
          <p>no tenés componentes en el armado.</p>
        </div>
        <Link to="/productos" className="btn-add" style={{ textDecoration: 'none' }}>elegir componentes</Link>
      </div>
    )
  }

  return (
    <div className="payment">
      <h2>confirmar compra</h2>

      <div className="table-wrap payment-card">
        <table className="build-table">
          <thead>
            <tr>
              <th>tipo</th>
              <th>producto</th>
              <th>precio</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.tipo}>
                <td>{it.tipo}</td>
                <td>{it.nombre}</td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span>usd ${it.precio}</span>
                    {typeof usdArsRate === 'number' && Number.isFinite(usdArsRate) && (
                      <span style={{ color: '#444' }}>ar$ {(it.precio * usdArsRate).toLocaleString('es-AR', { maximumFractionDigits: 0 })}</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2} className="total-label">total</td>
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

      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-field">
          <label htmlFor="name">nombre</label>
          <input id="name" className="text-input" placeholder="tu nombre" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-field">
          <label htmlFor="email">email</label>
          <input id="email" className={`text-input ${emailsMatch ? 'is-valid' : ''}`} placeholder="tu@email.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-field">
          <label htmlFor="emailConfirm">confirmar email</label>
          <input
            id="emailConfirm"
            className={`text-input ${emailsMatch ? 'is-valid' : ''}`}
            placeholder="repetí tu email"
            type="email"
            value={emailConfirm}
            onChange={(e) => setEmailConfirm(e.target.value)}
            onPaste={(e) => e.preventDefault()}
            required
          />
        </div>
        <div className="payment-actions">
          <button type="submit" className="btn-add">pagar</button>
          <Link to="/armado" className="btn-secondary" style={{ textDecoration: 'none' }}>volver</Link>
        </div>
      </form>
    </div>
  )
}
