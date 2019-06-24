import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUser, logout } from '../../ducks/reducers/user'
import { Link } from 'react-router-dom'
import AddMealForm from '../AddMealForm/AddMealForm'

import Nav from '../Nav/Nav'

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
          mealForm: false
        }
    }

    componentDidMount() {
        console.log(5555, this.props)
        axios
          .get('/auth/currentUser')
          .then(res => {
              console.log(77777, res)
            this.props.getUser(res.data)
          })
          .catch(err => {
            console.log('Not logged in');
          });
      }

    handleLogout = () => {
      this.props.logout()
    }

    showAddMealForm = () => {
      let { mealForm } = this.state
      this.setState({
        mealForm: !mealForm
      })
    }

    

    // we're going to be working with req.query.q 

    render() {
        return (
            <div>
                <div>Dashboard</div>
                <div>Welcome, {this.props.user.name}</div>
                <Nav />
                <Link to='/' onClick={this.handleLogout}>Logout</Link>
                <button onClick={this.showAddMealForm}>Add Meal</button>
                {this.state.mealForm && <AddMealForm/>}      
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(4444, state)
    let { data: user } = state.user
    return { user }
  }

export default connect(mapStateToProps, { getUser, logout })(Dashboard)