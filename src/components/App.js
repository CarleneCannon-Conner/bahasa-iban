import React, { Component } from 'react'
import Header from './Header'
import Login from './Login'
import { Switch, Route, Redirect } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <Switch>
          <Route exact path='/' render={() => <Redirect to='/new/1' />} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
