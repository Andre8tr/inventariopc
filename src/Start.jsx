import React from 'react'
import {BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import App from './App.jsx'
import Header from './Header.jsx'
import Historial from './Historial.jsx'

const Start = () => {
  return(
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/historial" component={Historial} />
      </Switch>
    </Router>


  )
}

export default Start
