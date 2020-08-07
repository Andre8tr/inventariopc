import React, {useState, useEffect} from 'react'
import {firebase} from './firebase.js'
import Menu from './Menu.jsx'

const Encargados = () => {
  const [nombre, setNombre] = useState('')
  const [departamento, setDepartamento] = useState('')
  const [encargados, setEncargados] = useState([])
  const [edicion, setEdicion] = useState(false)
  useEffect(() => {
    obtenerListado()
  }, [])

  const obtenerListado = async() => {
    try {
      const db = firebase.firestore()
      const data = await db.collection('personas').get()
      console.log(data);
      const arrayEncargados = data.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setEncargados(arrayEncargados)
    } catch (e) {

    } finally {

    }
  }

  const agregar = async(e) => {
    e.preventDefault()
    if(!encargados.trim() && !departamento.trim())
    try {

    } catch (e) {

    } finally {

    }
  }

  const activarEdicion = (item) => {
    setEdicion(true)
    setNombre(item.nombre)
    setDepartamento(item.departamento)
  }
  const editar = async(e) => {

  }
  return(
    <div className = "fluid">
      <h1 className = "text-center"> Catalogo de encargados </h1>
      <div className = "row">
        <Menu className = "col-sm-12 col-md-4 col-lg-4" />
        <div className = "col-sm-12 col-md-5 col-lg-5">
          <h2> Listado de encargados </h2>
          <ul>
            {
              encargados.map(item => (
                <li key={item.id}
                    className = "list-group-item">
                    Nombre: {item.nombre} <br />
                    Departamento: {item.departamento}
                    <button className = "btn btn-sm btn-warning float-right"
                            onClick={() => activarEdicion(item)}>Editar</button>
                    <button className = "btn btn-sm btn-danger float-right mx-2">Eliminar</button>
                </li>

              ))
            }
          </ul>
        </div>
        <div className = "col-sm-12 col-md-3 col-lg-3">
        <form onSubmit = {edicion ? editar : agregar}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input type="email" className="form-control" onChange = {e => setNombre(e.target.value)} value={nombre} />
          </div>
          <div className="form-group">
            <label htmlFor="proceso">Departamento</label>
            <input type="text" className="form-control" onChange = {e => setDepartamento(e.target.value)} value = {departamento}/>
          </div>
          <button type="submit" className="btn btn-primary">Guardar</button>
        </form>
        </div>
      </div>

    </div>
  )
}

export default Encargados
