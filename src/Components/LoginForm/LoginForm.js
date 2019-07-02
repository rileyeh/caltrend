import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Register from '../Register/Register'
import styled from 'styled-components'

import { login } from '../../ducks/reducers/user'

class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            register: false
        }
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = () => {
        let { email, password } = this.state
        this.props.login({ email, password })
    }

    toggleRegister = () => {
        // let { register } = this.state
          this.setState({
              register: true
        })
    }

    render() {
        return (
            <div>
                {this.state.register ? <Register /> :
                    <Body>
                        <TopBar>
                            <h4>log in</h4>
                            <label onClick={this.props.closeLogin}>X</label>
                        </TopBar>

                        <LoginInput
                            name='email'
                            type='text'
                            placeholder='email'
                            onChange={this.handleChange}
                            value={this.state.email} />

                        <LoginInput
                            name='password'
                            type='password'
                            placeholder='password'
                            onChange={this.handleChange}
                            value={this.state.password} />

                        <Link to='/dashboard'><AuthButton onClick={this.handleSubmit}>login</AuthButton></Link>

                    
                        <RegisterQ>need an account?<AuthButton onClick={this.toggleRegister}>register</AuthButton></RegisterQ>

                    </Body>
            }
            </div>
        )
    }
}

export default connect(null, { login })(LoginForm)

// let darkGreen = '#219653'
// let mediumGreen = '#2DB969'
// let lightGreen = '#36D97C'
let greenBlue ='#28b485'
let darkAccent = '#333333'
let lightAccent = '#F4F4F4'
// let lightShadow = '#f0f0f0'

const Body = styled.div`
    height: 90vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const TopBar = styled.div`
    width: 100%;
    height: 50px;
    background: ${darkAccent};
    color: ${lightAccent};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    margin-bottom: 30px;
`

const LoginInput = styled.input`
    border: none;
    border-radius: 0;
    border-bottom: 1px solid ${darkAccent};
    background: ${lightAccent};
    width: 70%;
    margin: 30px 0;
    font-size: 16px;
`

const AuthButton = styled.button`
    background: ${lightAccent};
    color: ${greenBlue};
    width: 75px;
    height: 30px;
    border: none;
    font-size: 16px;
    
    &:hover {
        border-radius: 8px;
        background: ${darkAccent};
        color: ${lightAccent}
    }
`

const RegisterQ = styled.p`
    font-size: 16px;
    margin-top: 20px;
`