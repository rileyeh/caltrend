import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUser, logout } from '../../ducks/reducers/user'
import { clearCurrentMeal } from '../../ducks/reducers/meals'
import { Redirect, Link } from 'react-router-dom'
import styled from 'styled-components'
import CaloriesChart from '../Charts/CaloriesChart'
import Nav from '../Nav/Nav'

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
                <StyledCaloriesChart />
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

// let darkAccent = '#5C5C5C'
let whiteAccent = '#F8F8F8'
let lightBlue = '#50B6BB'
// let mediumBlue = '#4BA9AD'
let darkBlue = '#45969B'
let orange = '#FF6830'

const Body = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: ${whiteAccent};
`

const Greeting = styled.h1`
  color: ${lightBlue};
  font-weight: bold;
  font-size: 30px;
  padding: 20px 0;

  @media(min-width: 500px) {
    font-size: 32px;
    padding: 30px 0;
  }

  @media(min-width: 1000px) {
    font-size: 36px;
  }
`
const StyledCaloriesChart = styled(CaloriesChart)`
  padding: 10px 0;
`

const ButtonContainer = styled.div`
  min-width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  padding: 40px 20px 0 20px;
`

const ButtonLink = styled(Link)`
  background: ${darkBlue}
  width: 90px;
  height: 90px;
  border-radius: 50%;
  color: ${whiteAccent}
  font-size: 14px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  :hover {
    background: ${orange};
  }

  @media(min-width: 500px) {
    margin: 0 30px;
  }
`