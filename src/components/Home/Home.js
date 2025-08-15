import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

export const Home = () => {
  return (
    <div className="home">
      <h1 className="home-title">armá tu pc</h1>
      <p className="home-sub">elegí por dónde querés empezar</p>

      <div className="home-grid">
        <Link
          to="/productos/CPU?marca=Intel%20Core"
          className="home-card intel"
          aria-label="empezar con intel"
        >
          <div className="home-card-content">
            <span className="home-card-title">intel</span>
            <span className="home-card-desc">procesadores intel core</span>
          </div>
        </Link>

        <Link
          to="/productos/CPU?marca=AMD%20Ryzen"
          className="home-card amd"
          aria-label="empezar con amd"
        >
          <div className="home-card-content">
            <span className="home-card-title">amd</span>
            <span className="home-card-desc">procesadores amd ryzen</span>
          </div>
        </Link>
      </div>

      <Link to="/productos" className="home-cta alt">ver todo</Link>
    </div>
  )
}
