import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return(
    <header className = "fluid">
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      </button>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <Link to = "/">
            <li className="nav-item">
              <p className = "nav-link">Inicio</p>
            </li>
          </Link>
          <Link to = "/historial">
            <li className="nav-item">
              <span className = "nav-link">Historial</span>
            </li>
          </Link>
          <Link to = "/catalogos">
            <li className="nav-item">
              <span className = "nav-link">Catalogos</span>
            </li>
          </Link>
        </ul>
      </div>
    </nav>
    </header>
  )
}

export default Header
