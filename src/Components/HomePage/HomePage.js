import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

import LoginForm from '../LoginForm/LoginForm'
import blueLogo from '../../assets/LogoBlue.svg'
import citrus from '../../assets/bluecitrus.PNG'

class HomePage extends Component {
    constructor(props) {
        super()

        this.state = {
            loginForm: null
        }
    }

    openLogin = () => {
        this.setState({
            loginForm: true
        })
    }

    closeLogin = () => {
        this.setState({
            loginForm: false
        })
    }

    render() {
        if (this.props.user_id) {
            return <Redirect to="/dashboard" />
          }
          return (
              <Body >
                <Header>
                    <Logo>
                        <LogoImage src={blueLogo} alt='cal logo'/>
                        <LogoText>caltrend</LogoText>
                    </Logo>
                    
                    <Button onClick={this.openLogin} >login/register</Button>
                    
                </Header>

                <Welcome>
                    <h1>WELCOME</h1>
                    <p>login or register to use caltrend's health tracking tools</p>
                </Welcome>

                {this.state.loginForm && <LoginForm closeLogin={this.closeLogin}/>}
            </Body>
        )
    }
}

function mapStateToProps(state) {
    return {
        user_id: state.user.data
      }
  }

export default connect(mapStateToProps)(HomePage)

// let shadow = '#787878'
// let mediumShadow = '#636363'
// let darkAccent = '#5C5C5C'
let whiteAccent = '#F8F8F8'
// let lightBlue = '#50B6BB'
let mediumBlue = '#4BA9AD'
let darkBlue = '#45969B'
// let red = '#FF5757'

const Body = styled.div`
    min-height: 100vh;
    min-width: 100vw;
    background: ${whiteAccent};
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Logo = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
`

const LogoImage = styled.img`
    width: 45px;
    margin: 8px;
`

const LogoText = styled.h1`
    color: ${darkBlue};
`

const Button = styled.button`
    height: 40px;
    width: 120px;
    background: ${whiteAccent};
    color: ${mediumBlue};
    border: 1px solid ${darkBlue};
    margin-right: 10px;
    border: none;
    font-size: 16px;

    &:hover {
        background: ${mediumBlue};
        color: ${whiteAccent};
        border-radius: 8px;
    }
`
const Welcome = styled.div`
    height: 95vh;
    background-image: url(${citrus});
    background-size: cover;
    background-position: top;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 20px;

    > h1 {
        color: ${whiteAccent};
    }

    > p {
        color: ${whiteAccent};
    }


    @media(min-width: 500px) {
        font-size: 30px;
    }

    @media(min-width: 1000px) {
        font-size: 35px;
    }
`