import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUser, logout } from '../../ducks/reducers/user'
import { Link, Redirect } from 'react-router-dom'
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
        axios
          .get('/auth/currentUser')
          .then(res => {
            this.props.getUser(res.data)
          })
          .catch(err => {
            console.log('Not logged in');
          });
      }

    showAddMealForm = () => {
      let { mealForm } = this.state
      this.setState({
        mealForm: !mealForm
      })
    }

    

    // we're going to be working with req.query.q 

    render() {
      if (!this.props.user) {
        return <Redirect to='/' />
      }
        return (
            <div>
                <div>Dashboard</div>
                {this.props.user && <div>Welcome, {this.props.user.name}</div>}
                <Nav />
                <button onClick={this.showAddMealForm}>Add Meal</button>
                {this.state.mealForm && <AddMealForm/>}      
            </div>
        )
    }
}

function mapStateToProps(state) {
    let { data: user } = state.user
    return { user }
  }

export default connect(mapStateToProps, { getUser, logout })(Dashboard)