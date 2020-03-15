import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Register from '../Register/Register'
import { login } from '../../ducks/reducers/user'
import { Body, TopBar, LoginInput, AuthButton, RegisterQ } from './styles'

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
        console.log('info to log in with:', email, password)
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