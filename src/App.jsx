import React, {useEffect, useState} from 'react';
import Header from './Header.jsx'
import {firebase} from './firebase'



function App() {
  const [computadora, setComputadora] = useState('')
  const [marca, setMarca] = useState('')
  const [id, setId] = useState('')
  const [date, setDate] = useState('')
  const [edicion, setEdicion] = useState(false)
  const [computadoras, setComputadoras] = useState([])

  useEffect(() => {
    const obtenerDatos = async() => {
      try {
        const db = firebase.firestore() //Instanciar firestore
        const data = await db.collection('computadoras').get()
        console.log(data);
        const arrayData = data.docs.map(doc => (
          {
            id: doc.id,
            ...doc.data()
          }
        ))
        const prestados = arrayData.filter(item => item.prestada === true)
        console.log(prestados);
        setComputadoras(prestados)
      } catch (e) {
        console.log(e);
      } finally {

      }
    }
    obtenerDatos()
  }, [])


  const agregar = async (e) => {
    e.preventDefault()
    if(!computadora.trim()){
      console.log('Contenido vacio');
      return
    }
    try {
      const db = firebase.firestore()
      let ddate = new Date().toString("M/d/yyyy")
      console.log(ddate);
      //ddate = mm + '-' + dd + '-' + yyyy
      const nuevo = {
        nombre : computadora,
        marca: marca,
        cargador: true,
        prestada: true,
        fechaEntrega: date
      }
      const data = await db.collection('computadoras').add(nuevo)
      setComputadoras([
        ...computadoras,
        {...nuevo, id: data.id}
      ])
      setComputadora('')
      setMarca('')
    } catch (e) {

    } finally {

    }
  }

  const activarEdicion = (item) => {
    setEdicion(true)
    setId(item.id)
    setComputadora(item.nombre)
    setMarca(item.marca)
  }

  const editar = async (e) => {
    e.preventDefault()
    if(!computadora.trim() && !marca.trim()){
      console.log('Esto esta vacio');
      return
    }
    try {
      const db = firebase.firestore()
      await db.collection('computadoras').doc(id).update({
        nombre: computadora,
        marca: marca
      })
      //Volver a mostrar los datos actualizados
      const arrayEditado = computadoras.map(item =>(
          item.id === id ? {
            id: item.id, //Item siempre igual porque no lo actualizamos
            nombre: computadora, //Se pone el nuevo, esto pasa si el item.id es igual al id que tenemos en el estado
            marca: marca //Se pone el nuevo, esto pasa si el item.id es igual al id que tenemos en el estado
          } : item
        )
      )
      console.log(arrayEditado);
      setComputadoras(arrayEditado)
      setComputadora('')
      setMarca('')
      setEdicion(false)
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  const eliminar = (id) => {
    try {
      const db = firebase.firestore()
      //db.collection('computadoras').doc(id).delete()
      db.collection('computadoras').doc(id).update({
        prestada: false
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
      <h1 className = "text-center"> Inventario de computadoras </h1>
      <div className = "row">
        <div className = "col-sm-12 col-md-6 col-lg-6">
          Listado
          <ul>
            {
              computadoras.map(item => (
                <li className = "list-group-item" key = {item.id}>
                  {
                      item.marca + ' - ' + item.nombre
                  }
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

          <form onSubmit = {edicion ? editar : agregar}>
            <div className="form-group mt-4">
              <label htmlFor="exampleInputPassword1">Computadora:</label>
              <input type="text" className="form-control" onChange = {e => setComputadora(e.target.value)} value = {computadora} name = "pc"/>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Marca:</label>
              <input type="text" className="form-control" onChange = {e => setMarca(e.target.value)} value = {marca}  />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Fecha:</label>
              <input type="date" className="form-control" onChange = {e => setDate(e.target.value)} value = {date}  />
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
