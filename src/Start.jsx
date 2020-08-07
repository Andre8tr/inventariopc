import React from 'react'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App.jsx'
import Header from './Header.jsx'
import Historial from './Historial.jsx'
import Encargados from './Encargados.jsx'
import Departamentos from './catalogos/Departamentos.jsx'
import Computadoras from './catalogos/Computadoras.jsx'

const Start = () => {
  return(
    <Router>
      <Header />
      <Switch>
        <Route path= "/" exact component={App} />
        <Route path= "/historial" component={Historial} />
        <Route path= "/catalogos" exact component={Encargados} />
        <Route path = "/catalogos/departamentos" component = {Departamentos} />
        <Route path = "/catalogos/computadoras" component = {Computadoras} />
      </Switch>
    </Router>


  )
}

export default Start
