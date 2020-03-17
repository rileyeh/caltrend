import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { getUser } from './redux/reducers/user'
import routes from './routes'

class App extends Component {
  componentDidMount() {
    this.props.getUser()
  }
  
  render() {
    return (
      <div>
        {routes}
      </div>
    );
  }
}

export default connect(null, {getUser})(App);
