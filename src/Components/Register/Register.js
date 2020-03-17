import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUser } from '../../redux/reducers/user'
import LoginForm from '../LoginForm/LoginForm'
import { Body, TopBar, LoginInput, AuthButton, RegisterQ } from './styles'

class Register extends Component {
  constructor(props) {
    super(props)

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
        this.props.history.push('/dashboard');

        // this.setState({property: res.data})
        // if (this.state.property.length > 0) {
        //   this.props.history.push('/')
        // } else {
        //   this.setState({errorMsg: true})
        // }
      })
      .catch(err => {
        console.log(err)
      })
  }

  toggleLogin = () => {
      let { login } = this.state
        this.setState({
            login: !login
      })
  }

  render() {
    // if (this.props.id) {
    //   return <Redirect to="/" />;
    // }
    return (
      <div>
        {this.state.login ? <LoginForm /> :
            <Body>
              <TopBar>
                  <h4>register</h4>
                  <label onClick={this.props.closeLogin}>X</label>
              </TopBar>

            <LoginInput
                type="text"
                placeholder="name"
                name="name"
                onChange={this.handleInput}
                value={this.state.name}
                />
            <LoginInput
                type="text"
                placeholder="mail"
                name="email"
                onChange={this.handleInput}
                value={this.state.email}
                />
            <LoginInput
                type="password"
                placeholder="password"
                name="password"
                onChange={this.handleInput}
                value={this.state.password}
                />
            <AuthButton onClick={() => this.register()}>register</AuthButton>
            
                <RegisterQ>
                    already have an account?
                    <AuthButton onClick={this.toggleLogin}>login</AuthButton>
                </RegisterQ>
        </Body>
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

export default connect(mapStateToProps, { getUser })(Register)