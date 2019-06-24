import React, { Component } from 'react'
import { connect } from 'react-redux'

import LoginForm from '../LoginForm/LoginForm'

class HomePage extends Component {
    constructor(props) {
        super()

        this.state = {
            loginform: false
        }
    }

    componentDidMount() {
        console.log(2222222, this.props.user_id)
    }

    openLogin = () => {
        this.setState({
            loginform: true
        })
    }

    render() {
        return (
            <div style={styles.body}>
                <h1 style={styles.title}>caltrend</h1>
                <button onClick={this.openLogin} style={styles.loginButton}>Login</button>
                {this.state.loginform && <LoginForm />}

            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(12121212, state)
    return {
        user_id: state.user.data
      }
  }


export default connect(mapStateToProps)(HomePage)


let styles = {
    body: {
        width: '100vw',
        height: '100%',
        margin: 0,
        padding: 0,
        position: 'relative'
    },
    title: {
        width: '100%',
        margin: '10px auto',
        textAlign: 'center'
    },
    loginButton: {
        borderRadius: 8,
        position: 'absolute',
        top: 10,
        right: 10
    }
}