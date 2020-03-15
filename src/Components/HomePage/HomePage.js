import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import LoginForm from '../LoginForm/LoginForm'
import blueLogo from '../../assets/LogoBlue.svg'
import { Body, Header, Logo, LogoImage, LogoText, Button, Welcome } from './styles'

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