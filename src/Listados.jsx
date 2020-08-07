import React, {useState, useEffect} from 'react'
import {firebase} from './firebase.js'

const Listados = (props) => {
  const [items, setItems] = useState([])
  return(
    <div className = "col-sm-12 col-md-5 col-lg-5">
      <h2> Listado de encargados </h2>
      <ul>
        <li> Hola </li>
      </ul>
    </div>
  )
}

export default Listados
