import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUser } from '../../ducks/reducers/user'
import LoginForm from '../LoginForm/LoginForm'
import styled from 'styled-components'

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

export default connect(
  mapStateToProps,
  { getUser }
)(Register);


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
        height: 450px;
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