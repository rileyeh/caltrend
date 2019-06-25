import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Register from '../Register/Register'

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
        console.log(66666, this.props)
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
            <div style={styles.body}>
                {this.state.register ? <Register /> :
            <div style={styles.formBody}>
                <input
                    name='email'
                    type='text'
                    placeholder='email'
                    onChange={this.handleChange}
                    value={this.state.email}
                    style={styles.emailInput} />
                <br />
                <input
                    name='password'
                    type='password'
                    placeholder='password'
                    onChange={this.handleChange}
                    value={this.state.password}
                    style={styles.passwordInput} />
                <br />
                <Link to='/dashboard'><button onClick={this.handleSubmit}>login</button></Link>
                <div>
                <p>
                    Need an account?
                    <button onClick={this.toggleRegister}>Register</button>
                </p>
            </div>
            </div>
            }
            </div>
        )
    }
}

export default connect(null, { login })(LoginForm)

let styles = {
    body: {
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        position: 'relative'
    },
    formBody: {
        width: '40vw',
        height: '60vh',
        margin: '0 auto',
        borderRadius: 10,
        boxShadow: '10px 10px 30px #636363',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        lineHeight: 2,
        fontFamily: 'Raleway, sans-serif'
    },
    emailInput: {
        width: '60%',
        marginTop: '40%',
        border: 'none',
        borderBottom: '1px solid grey'
    },
    passwordInput: {
        width: '60%',
        border: 'none',
        borderBottom: '1px solid grey'
    }
}