import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUser, logout } from '../../ducks/reducers/user'
import { clearCurrentMeal } from '../../ducks/reducers/meals'
import { Redirect, Link } from 'react-router-dom'
import styled from 'styled-components'

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
          });
      }
    // we're going to be working with req.query.q 

    render() {
      if (!this.props.user) {
        return <Redirect to='/' />
      }
        return (
          <div>
            <Nav />

            <Body>
                {this.props.user && <Greeting>Welcome, {this.props.user.name}</Greeting>}
                <Graph></Graph>
                <ButtonContainer>
                  <ButtonLink to='addmeal' onClick={this.props.clearCurrentMeal}>Add<br/>Meal</ButtonLink>
                  <ButtonLink to='/'>Log<br/>Weight</ButtonLink>
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

// let darkGreen = '#219653'
// let mediumGreen = '#2DB969'
let greenBlue ='#28b485'
let darkAccent = '#333333'
let lightAccent = '#F4F4F4'

const Body = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: ${lightAccent}

 @media(min-width: 500px) {
   align-items: flex-start;
 }
`

const Greeting = styled.h1`
  color: ${greenBlue};
  font-weight: bold;
  font-size: 30px;
  padding: 20px 0;

  @media(min-width: 500px) {
    margin-left: 60px;
    padding-top: 40px;
  }

  @media(min-width: 1000px) {
    padding-top: 60px;
  }
`
const Graph = styled.div`
  border-bottom: 1px solid ${darkAccent};  
  border-left: 1px solid ${darkAccent};
  width: 250px;
  height: 300px;

  @media(min-width: 500px) {
    margin: 60px;
  }
`
const ButtonContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-between;
  padding: 40px 20px 0 20px;

  @media(min-width: 500px) {
    justify-content: flex-start;
  }
`

const ButtonLink = styled(Link)`
  background: ${greenBlue}
  width: 90px;
  height: 90px;
  border-radius: 50%;
  color: ${lightAccent}
  font-size: 14px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  @media(min-width: 500px) {
    margin: 0 30px;
  }
`