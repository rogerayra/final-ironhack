import React, { useContext } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/auth/Login'
import CustomerHome from './components/customers/CustomerHome'
import UserHome from './components/users/UserHome'
import VisitHome from './components/visits/VisitHome'
import { LocaleProvider } from 'antd'
import esES from 'antd/lib/locale-provider/es_ES'
import { MyContext } from './context'
import Navbar from './components/Navbar'

const Router = () => {
  const context = useContext(MyContext)
  return (
    <LocaleProvider locale={esES}>
      <BrowserRouter>
        {context.state.isLogged ? <Navbar /> : ''}
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              !context.state.isLogged ? (
                <Redirect to="/login" />
              ) : context.state.user.role === 'ADMIN' ? (
                <Redirect to="/customers" />
              ) : (
                <Redirect to="/visits" />
              )
            }
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/customers" component={CustomerHome} />
          <Route exact path="/visits" component={VisitHome} />
          <Route exact path="/users" component={UserHome} />
        </Switch>
      </BrowserRouter>
    </LocaleProvider>
  )
}

export default Router
