import React, {useState, useEffect} from 'react'
import {firebase} from './firebase.js'

const Historial = () =>{
  const [prestamos, setPrestamos] = useState([])

  useEffect(() => {
    obtenerHistorial()
  }, [])

  const obtenerHistorial = async () => {
    try {
      const db = firebase.firestore()
      const data = await db.collection('computadoras').get()
      const arrayData = data.docs.map(doc => ({
        id: doc.id,
        ...doc.data()

      }))
      const filtro = arrayData.filter(item => item.prestada === false)
      const ordenado = filtro.sort((a,b) => {
        return new Date(b.fechaRecibida) - new Date(a.fechaRecibida)
      })
      setPrestamos(ordenado)
    } catch (e) {

    } finally {

    }

  }

  return(
    <div className="container">
      <h1 className = "text-center"> Historial de prestamos </h1>
      <hr></hr>
      <div className = "row">
        <div className = "col-sm-12 col-md-12 col-lg-12">
          <h2> Listado </h2>
          <ul>
              {
                prestamos.map(item => (
                  <li key = {item.id} className = "list-group-item">
                    {item.marca} - {item.nombre} <br />
                    Prestada a : {item.encargado} <br />
                    Recbidia el día: {item.fechaRecibida}
                  </li>
                ))
              }
          </ul>

        </div>
      </div>
    </div>
  )
}



export default Historial
