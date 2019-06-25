import React, { Component } from 'react'
import { connect } from 'react-redux'

import LoginForm from '../LoginForm/LoginForm'
import logo from '../../assets/Logo.svg'

class HomePage extends Component {
    constructor(props) {
        super()

        this.state = {
            loginForm: null
        }
    }

    componentDidMount() {
        console.log(2222222, this.props.user_id)
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
        return (
            <div style={styles.body}>
                <div style={styles.header} >
                    <div style={styles.logo}>
                        <img src={logo} alt='cal logo' style={styles.logoImage}/>
                        <h1 style={styles.title}>caltrend</h1>
                    </div>
                    <div>
                        <button onClick={this.openLogin} style={styles.button}>login/register</button>
                    </div>
                </div>

                {this.state.loginForm && <LoginForm />}

                <div style={styles.main} onClick={this.closeLogin}>
                    
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(12121212, state.user.data)
    return {
        user_id: state.user.data
      }
  }


export default connect(mapStateToProps)(HomePage)


let styles = {
    body: {
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 10
    },
    logoImage: {
        height: 45,
        marginRight: 5
    },
    title: {
        color: '#219653'
    },
    button: {
        borderRadius: 8,
        border: 'none',
        marginRight: 10,
        background: '#2DB969',
        color: 'white',
        height: 25,
        width: 90
    }
}