import {useState, useEffect} from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import Menu from '../Menu.jsx'
import {firebase} from '../firebase.js'

const Departamento = () => {
  const [departamento, setDepartamento] = useState('')
  const [departamentos, setDepartamentos] = useState([])
  const [id, setId] = useState('')
  const [edicion, setEdicion] = useState(false)


  useEffect(() => {
    obtenerDepartamentos()
  }, [])

  const obtenerDepartamentos = async () =>{
    try {
      const db = firebase.firestore()
      const data = await db.collection('departamentos').get()
      const arrayDepartamentos = data.docs.map(doc => (
        {
          id: doc.id,
          ...doc.data()
        }
      ))
      setDepartamentos(arrayDepartamentos)
    } catch (e) {

    } finally {

    }
  }

  const agregar = async (e) => {
    e.preventDefault()


    try {
      const db = firebase.firestore()
      const nuevoDepartamento = {
        nombre: departamento
      }
      const data = await db.collection('departamentos').add(nuevoDepartamento)
      setDepartamentos([
        ...departamentos,
        {...nuevoDepartamento, id: data.id}
      ])
    } catch (e) {

    } finally {
      limpiar()
    }
  }

  const editar = async (e) =>{
    e.preventDefault()
    if(!departamento.trim())
      return
    try {
      const db = firebase.firestore()
      await db.collection('departamentos').doc(id).update({
          nombre: departamento
      }
      )
      const arrayEditado = departamentos.map(item => (
        item.id === id ? {
          nombre: departamento
        } : item
      ))
      setDepartamentos(arrayEditado)
      limpiar()

    } catch (e) {
    } finally {

    }
  }

  const activarEdicion = (item) => {
    setEdicion(true)
    setDepartamento(item.nombre)
    setId(item.id)
  }

  const eliminar = async(id) => {
    try {
      const db = firebase.firestore()
      await db.collection('departamentos').doc(id).delete()
      await obtenerDepartamentos()
    } catch (e) {

    } finally {

    }
  }

  const limpiar = () => {
    setDepartamento('')
    setEdicion(false)
  }

  return(
    <div className = "fluid">
      <h1 className = "text-center"> Catalogo de Departamentos </h1>
      <div className = "row mx-2">
        <div className = "col-sm-12 col-md-2 col-lg-2">
          <Menu />
        </div>
        <div className = "col-sm-12 col-md-5 col-lg-5">
          <h2> Listado de departamentos</h2>
          <ul className = "list-group">
            {
              departamentos.map(item => (
                <li key = {item.id} className = "list-group-item">
                  {item.nombre}
                  <button className = "btn btn-danger btn-sm float-right mx-2"
                          onClick = {() => eliminar(item.id)}
                          >Eliminar</button>
                  <button className = "btn btn-warning btn-sm float-right"
                          onClick = {() => activarEdicion(item)}>
                          Editar</button>
                 </li>

              ))
            }
          </ul>
        </div>
        <div className = "col-sm-12 col-md-5 col-lg-5">
          <form onSubmit = {edicion ? editar : agregar}>
            <div className="form-group">
              <h2>{edicion ? 'Editar departamento' : 'Agregar departamento'}</h2>
              <label htmlFor="exampleInputEmail1">Nombre</label>
              <input type="text" className="form-control" onChange = {(e) => setDepartamento(e.target.value)} value={departamento} />
            </div>
            <button type="submit" className={edicion ? 'btn btn-warning' : 'btn btn-primary'}>Guardar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Departamento
