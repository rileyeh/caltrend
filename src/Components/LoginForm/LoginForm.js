import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { login } from '../../ducks/reducers/user'

class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
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

    render() {
        return (
            <div style={styles.formBody}>
                <input
                    name='email'
                    type='text'
                    placeholder='email'
                    onChange={this.handleChange}
                    style={styles.emailInput} />
                <br />
                <input
                    name='password'
                    type='password'
                    placeholder='password'
                    onChange={this.handleChange}
                    style={styles.passwordInput} />
                <br />
                <Link to='/dashboard'><button onClick={this.handleSubmit}>login</button></Link>
            </div>
        )
    }
}

export default connect(null, { login })(LoginForm)

let styles = {
    formBody: {
        width: '40vw',
        height: '60vh',
        margin: '5% auto',
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