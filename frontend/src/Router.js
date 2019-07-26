import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/auth/Login'
import CustomerHome from './components/customers/CustomerHome'
import UserHome from './components/users/UserHome'
import VisitHome from './components/visits/VisitHome'

const Router = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/customers" component={CustomerHome} />
      <Route exact path="/visits" component={VisitHome} />
      <Route exact path="/users" component={UserHome} />
    </Switch>
  </BrowserRouter>
)

export default Router
