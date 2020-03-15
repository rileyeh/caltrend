import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUser, logout } from '../../ducks/reducers/user'
import { clearCurrentMeal } from '../../ducks/reducers/meals'
import { Redirect } from 'react-router-dom'
import CaloriesChart from '../Charts/CaloriesChart'
import Nav from '../Nav/Nav'
import { Body, Greeting, ButtonLink, ButtonContainer } from './styles'

class Dashboard extends Component {
    componentDidMount() {
        axios
          .get('/auth/currentUser')
          .then(res => {
            this.props.getUser(res.data)
          })
          .catch(err => {
            console.log('Not logged in');
          })
      }

    render() {
      if (!this.props.user) {
        return <Redirect to='/' />
      }
        return (
          <div>
            <Nav />

            <Body>
                {this.props.user && <Greeting>Welcome, {this.props.user.name}</Greeting>}
                <CaloriesChart />
                <ButtonContainer>
                  <ButtonLink to='addmeal' onClick={this.props.clearCurrentMeal}>Add<br/>Meal</ButtonLink>
                  <ButtonLink to='/addweight'>Log<br/>Weight</ButtonLink>
                  <ButtonLink to='/'>Log<br/>Exercise</ButtonLink>
                </ButtonContainer>    
            </Body>
          </div>
        )
    }
}

function mapStateToProps(state) {
    let { data: user } = state.user
    return { user }
  }

export default connect(mapStateToProps, { getUser, logout, clearCurrentMeal })(Dashboard)