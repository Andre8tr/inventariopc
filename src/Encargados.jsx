import React, {useState, useEffect} from 'react'
import {firebase} from './firebase.js'
import Menu from './Menu.jsx'

const Encargados = () => {
  const [nombre, setNombre] = useState('')
  const [departamento, setDepartamento] = useState('')
  const [departamentos, setDepartamentos] = useState([])
  const [encargados, setEncargados] = useState([])
  const [id, setId] = useState('')
  const [edicion, setEdicion] = useState(false)
  const [verificacion, setVerificacion] = useState(false)
  useEffect(() => {
    obtenerListado()
    obtenerDepartamentos()
  }, [])

  const obtenerDepartamentos = async() => {
    try {
      let db = firebase.firestore()
      let data = await db.collection('departamentos').get()
      const arrayProcesos = data.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setDepartamentos(arrayProcesos)
      console.log(arrayProcesos);
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  const obtenerListado = async() => {
    try {
      const db = firebase.firestore()
      const data = await db.collection('encargados').get()
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
    if(!nombre.trim() || !departamento.trim()){
      setVerificacion(true)
      return
    }else{
      try {
        let db = firebase.firestore()
        let nuevoEncargado = {
          nombre: nombre,
          departamento: departamento
        }
        await db.collection('encargados').add(nuevoEncargado)
        await obtenerListado()
      } catch (e) {

      } finally {
        limpiar()
      }
    }

  }

  const activarEdicion = (item) => {
    setEdicion(true)
    setNombre(item.nombre)
    setId(item.id)
    setDepartamento(item.departamento)
  }
  const editar = async(e) => {
    e.preventDefault()
    if(!nombre.trim() || !departamento.trim()){
      return
    }else{
      try {
        let db = firebase.firestore()
        //En esta funcion no estoy seguro de los nombre del arreglo, no hay internet
        await db.collection('encargados').doc(id).update({
          nombre: nombre,
          departamento: departamento
        })
        limpiar()
      } catch (e) {

      } finally {
        await obtenerListado()
        await obtenerDepartamentos()
      }
    }
  }

  const eliminar = async (id)  => {
    try {
      let db = firebase.firestore()
      await db.collection('encargados').doc(id).delete()

    } catch (e) {

    } finally {
      await obtenerListado()
    }
  }

  const limpiar = () => {
    setNombre('')
    setDepartamento('')
    setVerificacion(false)
    setEdicion(false)
  }
  return(
    <div className = "fluid">
      <h1 className = "text-center"> Catalogo de encargados </h1>
      <div className = "row mx-2">
        <div className = "col-sm-12 col-md-2 col-lg-2">
          <Menu />
        </div>

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
                    <button className = "btn btn-sm btn-danger float-right mx-2"
                            onClick={() => eliminar(item.id)}
                      >Eliminar</button>
                </li>

              ))
            }
          </ul>
        </div>
        <div className = "col-sm-12 col-md-5 col-lg-5">
        <form onSubmit = {edicion ? editar : agregar}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input type="text" className="form-control" onChange = {e => setNombre(e.target.value)} value={nombre} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect2">Departamento: </label>
            <select  className="form-control" onChange={(e) => {
              setDepartamento(e.target.value)
            }}
            value = {departamento} >
              <option  hidden >Seleccione una opción...</option>
              {
                departamentos.map(item => (
                  <option key = {item.id}> {item.nombre} </option>
                ))
              }
            </select>
            <small  className={verificacion ? 'form-text text-muted alert-danger' : 'form-text text-muted'}>{verificacion ? 'Debe de seleccionar un valor' : ''}</small>
          </div>
          <button type="submit" className="btn btn-primary">Guardar</button>
        </form>
        </div>
      </div>

    </div>
  )
}

export default Encargados
