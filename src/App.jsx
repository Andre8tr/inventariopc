import React, {useEffect, useState} from 'react';
import {firebase} from './firebase'



function App() {
  const [computadora, setComputadora] = useState('')
  const [marca, setMarca] = useState('')
  const [id, setId] = useState('')
  const [encargado, setencargado] = useState('')
  const [edicion, setEdicion] = useState(false)
  const [computadoras, setComputadoras] = useState([])
  const [equipos, setEquipos] = useState([])
  const [encargados, setEncargados] = useState([])
  const [verificacion, setVerificacion] = useState(false)
  useEffect(() => {
    obtenerEquipos()
    obtenerEncargados()
    obtenerDatos()
  }, [])

  const obtenerDatos = async() => {
    try {
      const db = firebase.firestore() //Instanciar firestore
      const data = await db.collection('computadoras').get()
      const arrayData = data.docs.map(doc => (
        {
          id: doc.id,
          ...doc.data()
        }
      ))
      const prestados = arrayData.filter(item => item.prestada === true)
      setComputadoras(prestados)
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  const obtenerEquipos = async() => {
    try {
      let db = firebase.firestore()
      let data = await db.collection('equipos').get()
      const arrayEquipos = data.docs.map(item => (
        {
          id: item.id,
          ...item.data()
        }
      ))
      setEquipos(arrayEquipos)
    } catch (e) {

    } finally {

    }
  }

  const obtenerEncargados = async() =>{
    let db = firebase.firestore()
    let data = await db.collection('encargados').get()
    let arrayEncargados = data.docs.map(item => (
        {
          id: item.id,
          ...item.data()
        }
      ))
    setEncargados(arrayEncargados)
  }
  const agregar = async (e) => {
    e.preventDefault()

    if(!computadora.trim()){
      console.log('Contenido vacio');
      return
    }
    try {
      let fecha = new Date().toISOString().slice(0,10)
      const db = firebase.firestore()
      const nuevo = {
        nombre : computadora,
        cargador: true,
        prestada: true,
        encargado: encargado,
        fechaEntrega: fecha,
        fechaRecibida: ''
      }
      const data = await db.collection('computadoras').add(nuevo)
      setComputadoras([
        ...computadoras,
        {...nuevo, id: data.id}
      ])
      setComputadora('')
      setMarca('')
      setencargado('')
    } catch (e) {

    } finally {

    }
  }

  const activarEdicion = (item) => {
    setEdicion(true)
    setId(item.id)
    setComputadora(item.nombre)
    setencargado(item.encargado)
  }

  const editar = async (e) => {
    e.preventDefault()
    if(!computadora.trim() && !encargado.trim()){
      console.log('Esto esta vacio');
      return
    }
    try {
      const db = firebase.firestore()
      await db.collection('computadoras').doc(id).update({
        nombre: computadora,
        encargado: encargado
      })
      setComputadora('')
      setMarca('')
      setencargado('')
      setEdicion(false)
    } catch (e) {
      console.log(e);
    } finally {
      await obtenerDatos()
    }
  }

  const eliminar = (id) => {
    try {
      const db = firebase.firestore()
      let fecha = new Date().toISOString().slice(0,10)
      console.log(fecha);
      db.collection('computadoras').doc(id).update({
        prestada: false,
        fechaRecibida: fecha
      })
      const arrayEditado = computadoras.map(item =>(
          item.id === id ? {
            id: item.id, //Item siempre igual porque no lo actualizamos
            prestada: false
          } : item
        )
      )
      const filtrado = arrayEditado.filter(item => item.prestada === true )

      //const arrayFiltrado = computadoras.filter(item => item.id !== id)
      setComputadoras(filtrado)
    } catch (e) {

    } finally {

    }
  }



  return (
    <div className="container">
      <h1 className = "text-center"> Prestamos de computadoras </h1>
      <div className = "row">
        <div className = "col-sm-12 col-md-6 col-lg-6">
          Listado
          <hr />
          <ul>
            {
              computadoras.map(item => (
                <li className = "list-group-item" key = {item.id}>

                      Computadora: {item.nombre} <br />
                      Encargado: {item.encargado} <br />
                      Fecha Entrega: {item.fechaEntrega}

                  <button className = "btn btn-danger btn-sm float-right mx-2"
                          onClick = {() => eliminar(item.id)}
                          >Recibir</button>
                  <button className = "btn btn-warning btn-sm float-right"
                          onClick = {() => activarEdicion(item)}
                          >Editar</button>

                </li>
              ))
            }
          </ul>
        </div>
        <div className = "col-sm-12 col-md-6 col-lg-6">
          Formulario
          <hr />
          <form onSubmit = {edicion ? editar : agregar}>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect2">Computadora:</label>
            <select  className="form-control" onChange={(e) => {
              setComputadora(e.target.value)
            }}
            value = {computadora} >
              <option  hidden >Seleccione una opción...</option>
              {
                equipos.map(item => (
                  <option key = {item.id}> {item.marca + ' - ' + item.nombre} </option>
                ))
              }
            </select>
            <small  className={verificacion ? 'form-text text-muted alert-danger' : 'form-text text-muted'}>{verificacion ? 'Debe de seleccionar un valor' : ''}</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect2">Encargado:</label>
            <select  className="form-control" onChange={(e) => {
              setencargado(e.target.value)
            }}
            value = {encargado} >
              <option  hidden >Seleccione una opción...</option>
              {
                encargados.map(item => (
                  <option key = {item.id}> {item.nombre} </option>
                ))
              }
            </select>
            <small  className={verificacion ? 'form-text text-muted alert-danger' : 'form-text text-muted'}>{verificacion ? 'Debe de seleccionar un valor' : ''}</small>
          </div>

            <button type="submit"
                    className= {edicion ? "btn btn-warning" :  "btn btn-primary"}
                    >{edicion ? 'Editar' : 'Guardar'}</button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default App;
