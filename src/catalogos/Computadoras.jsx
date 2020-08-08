import  {useState, useEffect} from 'react'
/** @jsx jsx */
import {  jsx } from '@emotion/core'
import Menu from '../Menu.jsx'
import {firebase} from '../firebase.js'


const Computadoras = () => {
  const [equipos, setEquipos] = useState([])
  const [equipo, setEquipo] = useState('')
  const [modelo, setModelo] = useState('')
  const [id, setId] = useState('')
  const [verificacion, setVerificacion] = useState(false)
  const [marca, setMarca] = useState('')
  const [edicion, setEdicion] = useState(false)

  useEffect( () => {
     obtenerEquipos()
  },[])

  const obtenerEquipos = async () => {
    try {
      const db = firebase.firestore()
      const data = await db.collection('equipos').get()
      const docs = data.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setEquipos(docs)

    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  const agregar = async (e) => {
    e.preventDefault()
    if(!marca.trim()){
      console.log('No se selecciono nada');
      setVerificacion(true)
    }else{
      try {
        setVerificacion(false)
        const db = firebase.firestore()
        const nuevo = {
          nombre: equipo,
          marca: marca,
          modelo: modelo

        }
        await db.collection('equipos').add(nuevo)
        await obtenerEquipos()
      } catch (e) {
        console.log(e);
      } finally {
        limpiar()
      }
    }
  }

  const activarEdicion= (item) => {
    setEdicion(true)
    setEquipo(item.nombre)
    setMarca(item.marca)
    setModelo(item.modelo)
    setId(item.id)
  }

  const editar = async (e) => {
    e.preventDefault()
    try {
      const db = firebase.firestore()
      await db.collection('equipos').doc(id).update({
        nombre: equipo,
        marca: marca,
        modelo: modelo
      })
      await obtenerEquipos()
      limpiar()
    } catch (e) {

    } finally {

    }
  }

  const eliminar = async (id) => {
    try {
      const db = firebase.firestore()
      await db.collection('equipos').doc(id).delete()
      await obtenerEquipos()
      limpiar()
    } catch (e) {

    } finally {

    }
  }
  const activarNuevo = () => {
    setEquipo('')
    setMarca('')
    setModelo('')
    setEdicion(false)

  }
  const limpiar = () => {
    setModelo('')
    setEquipo('')
    setMarca('')
    setId('')
    setEdicion(false)
  }
  return(
    <div className = "fluid">
      <h1 className = "text-center"> Catalogo de Computadoras </h1>
      <div className = "row mx-2">
        <div className = "col-sm-12 col-md-2 col-lg-2">
          <Menu />
        </div>
        <div className = "col-sm-12 col-md-5 col-lg-5">
          <h2 className = "text-center">Listado de computadoras</h2>
          <ul className = "list-groups">
            {
              equipos.map(item => (
                <li key={item.id} className = "list-group-item">
                 {item.marca} - {item.nombre}
                  <button className = "btn btn-warning btn-sm float-right btn-sm mx-2"
                          onClick = {() => activarEdicion(item)}>Editar</button>
                  <button className = "btn btn-danger btn-sm float-right btn-sm"
                          onClick={() => eliminar(item.id)}>Eliminar</button>
                </li>
              ))
            }
          </ul>
        </div>
        <div className = "col-sm-12 col-md-5 col-lg-5">
          <h2 className = "text-center">{edicion ? 'Editar computadora' : 'Agregar computadora'}</h2>
          <form onSubmit ={edicion ? editar : agregar}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Nombre</label>
              <input type="text" className="form-control" onChange= {(e) => setEquipo(e.target.value)} value={equipo}  />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Modelo</label>
              <input type="text" className="form-control"  onChange = {(e) => setModelo(e.target.value)} value = {modelo} />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect2">Marca</label>
              <select  className="form-control" onChange={(e) => {
                setMarca(e.target.value)
              }}
              value = {marca} >
                <option  hidden >Seleccione una opción...</option>
                <option>Acer</option>
                <option>HP</option>
                <option>Lenovo</option>
                <option>Sony</option>
                <option>Otra</option>
              </select>
              <small  className={verificacion ? 'form-text text-muted alert-danger' : 'form-text text-muted'}>{verificacion ? 'Debe de seleccionar un valor' : ''}</small>
            </div>
            <button type="submit" className= {edicion ? "btn btn-warning mx-2" : "btn btn-primary" }>{edicion ? "Editar" : "Enviar"}</button>
            <button className= {edicion ? "btn btn-success" : "btn btn-success d-none mx-2"}
                    onClick = {() => activarNuevo()} >{edicion ? "Nuevo" : ""}</button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Computadoras
