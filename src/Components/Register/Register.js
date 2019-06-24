import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from '../../ducks/reducers/user'
import LoginForm from '../LoginForm/LoginForm'

class Register extends Component {
  constructor() {
    super()

    this.state = {
        name: '',
        email: '',
        password: '',
        login: false
      }
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  register() {
    const { name, email, password } = this.state;

    axios
      .post('/auth/register', { name, email, password })
      .then(res => {
        this.props.getUser(res.data);
        this.props.history.push('/');
      })
      .catch(err => {
        alert('User Already Exist Try Logging In');
      });
  }

  toggleLogin = () => {
      let { login } = this.state
        this.setState({
            login: !login
      })
  }

  render() {
    if (this.props.id) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        {this.state.login ? <LoginForm /> :
            <div style={styles.formBody}>
            <input
                type="text"
                placeholder="name"
                name="name"
                onChange={this.handleInput}
                value={this.state.name}
                style={styles.emailInput}
                />
            <input
                type="text"
                placeholder="Email"
                name="email"
                onChange={this.handleInput}
                value={this.state.email}
                style={styles.passwordInput}
                />
            <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.handleInput}
                value={this.state.password}
                style={styles.passwordInput}
                />
            <Link to='/dashboard'><button onClick={() => this.register()}>Register</button></Link>
            
            <div>
                <p>
                    Already have an account?
                    <button onClick={this.toggleLogin}>Login</button>
                </p>
            </div>
        </div>
    }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    id: state.user.data
  };
}

export default connect(
  mapStateToProps,
  { getUser }
)(Register);


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