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
                {this.state.register ? <Register closeLogin={this.props.closeLogin}/> :
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

// let shadow = '#787878'
// let mediumShadow = '#636363'
let darkAccent = '#5C5C5C'
let whiteAccent = '#F8F8F8'
// let lightBlue = '#50B6BB'
let mediumBlue = '#4BA9AD'
// let darkBlue = '#45969B'
// let orange = '#FF6830'

const Body = styled.div`
    height: 90vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 60px;
    background: ${whiteAccent};

    @media(min-width: 500px) {
        position: absolute;
        top: 350px;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        height: 400px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.7);
    }
`

const TopBar = styled.div`
    width: 100%;
    height: 50px;
    background: ${darkAccent};
    color: ${whiteAccent};
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
    background: ${whiteAccent};
    width: 70%;
    margin: 30px 0;
    font-size: 16px;
`

const AuthButton = styled.button`
    background: ${whiteAccent};
    color: ${mediumBlue};
    width: 75px;
    height: 30px;
    border: none;
    font-size: 16px;
    
    &:hover {
        border-radius: 8px;
        background: ${darkAccent};
        color: ${whiteAccent}
    }
`

const RegisterQ = styled.p`
    font-size: 16px;
    margin-top: 20px;
`