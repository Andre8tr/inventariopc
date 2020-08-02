import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return(
    <header className = "container">
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
        <Link to = "/">
          <li className="nav-item active">
            <a className="nav-link" href="contacto">Inicio</a>
          </li>
        </Link>
        <Link to = "/historial">
          <li className="nav-item">
            <a className="nav-link" href="contacto" >Historial</a>
          </li>
        </Link>

        </ul>
      </div>
    </nav>
    </header>
  )
}

export default Header
