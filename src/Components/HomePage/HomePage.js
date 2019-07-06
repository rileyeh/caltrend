import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

import LoginForm from '../LoginForm/LoginForm'
import logo from '../../assets/Logo.svg'

class HomePage extends Component {
    constructor(props) {
        super()

        this.state = {
            loginForm: null
        }
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
        if (this.props.user_id) {
            return <Redirect to="/dashboard" />
          }
          return (
              <Body >
                <Header>
                    <Logo>
                        <LogoImage src={logo} alt='cal logo'/>
                        <LogoText>caltrend</LogoText>
                    </Logo>
                    
                    <Button onClick={this.openLogin} >login/register</Button>
                    
                </Header>

                {this.state.loginForm && <LoginForm closeLogin={this.closeLogin}/>}
            </Body>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        user_id: state.user.data
      }
  }

export default connect(mapStateToProps)(HomePage)



let darkGreen = '#219653'
let mediumGreen = '#2DB969'
// let lightGreen = '#36D97C'
// let darkAccent = '#5C5C5C'
let lightAccent = '#F8F8F8'

const Body = styled.div`
    background: ${lightAccent};
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Logo = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
`

const LogoImage = styled.img`
    width: 45px;
    margin: 8px;
`

const LogoText = styled.h1`
    color: ${darkGreen};
`

const Button = styled.button`
    height: 40px;
    width: 120px;
    background: ${lightAccent};
    color: ${mediumGreen};
    border: 1px solid ${darkGreen};
    margin-right: 10px;
    border: none;
    font-size: 16px;

    &:hover {
        background: ${mediumGreen};
        color: ${lightAccent};
        border-radius: 8px;
    }
`











//         return (
//             <div style={styles.body}>
//                 <div style={styles.header} >
//                     <div style={styles.logo}>
//                         <img src={logo} alt='cal logo' style={styles.logoImage}/>
//                         <h1 style={styles.title}>caltrend</h1>
//                     </div>
//                     <div>
//                         <button onClick={this.openLogin} style={styles.button}>login/register</button>
//                     </div>
//                 </div>

//                 {this.state.loginForm && <LoginForm />}

//                 <div style={styles.main} onClick={this.closeLogin}>
                    
//                 </div>
//             </div>
//         )
//     }
// }

// function mapStateToProps(state) {
//     console.log(state)
//     return {
//         user_id: state.user.data
//       }
//   }


// export default connect(mapStateToProps)(HomePage)


// let styles = {
//     body: {
//         width: '100vw',
//         height: '100vh',
//         margin: 0,
//         padding: 0
//     },
//     header: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between'
//     },
//     logo: {
//         display: 'flex',
//         alignItems: 'center',
//         marginLeft: 10
//     },
//     logoImage: {
//         height: 45,
//         marginRight: 5
//     },
//     title: {
//         color: '#219653'
//     },
//     button: {
//         borderRadius: 8,
//         border: 'none',
//         marginRight: 10,
//         background: '#2DB969',
//         color: 'white',
//         height: 25,
//         width: 90
//     }
// }