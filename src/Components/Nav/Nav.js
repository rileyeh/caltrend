import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../ducks/reducers/user'
import styled from 'styled-components'
import whiteLogo from '../../assets/WhiteLogo.svg'
import blueLogo from '../../assets/LogoBlue.svg'


class Nav extends Component {
    constructor(props) {
        super(props)

        this.state = {
            menu: false
        }
    }

    componentDidMount() {
        this.setMenuTrue()
        window.addEventListener('resize', this.setMenuTrue)
    }

    setMenuTrue = () => {
        if (window.innerWidth > 500) {
            return this.setState({
                menu: true
            })
        } else {
            return this.setState({
                menu: false
            })
        }
    }

    toggleMenu = () => {
        let { menu } = this.state 
        this.setState({
            menu: !menu
        })
    }

    render() {
        return (
            <div>
                <Header>
                    <Logo to='/dashboard'>
                        {this.state.menu ? <LogoImage src={blueLogo} alt='cal logo'/> : <LogoImage src={whiteLogo} alt='cal logo'/>}
                        <LogoText>caltrend</LogoText>
                    </Logo>

                    <Ham onClick={this.toggleMenu}>&#9776;</Ham>

                </Header>

                {this.state.menu &&
                <Menu>
                    <StyledLink to='/dashboard'>Home </StyledLink>
                    <StyledLink to='/foodlog'>Food Log </StyledLink>
                    <StyledLink to='/weightlog'>Weight Log </StyledLink>
                    <StyledLink to="/" onClick={this.props.logout}>Logout</StyledLink>
                </Menu>
                }

            </div>
        )
    }
}

export default connect(null, { logout })(Nav)

let shadow = '#787878'
let mediumShadow = '#636363'
let darkAccent = '#5C5C5C'
let whiteAccent = '#F8F8F8'
let lightBlue = '#50B6BB'
let mediumBlue = '#4BA9AD'
let darkBlue = '#45969B'
let red = '#FF5757'

const Header = styled.div`
    background: linear-gradient(to right bottom, ${lightBlue}, ${mediumBlue}, ${darkBlue});
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media(min-width: 500px) {
        width: 120px;
        position: absolute;
        border-bottom: none;
    }

    @media(min-width: 1000px) {
        width: 160px;
    }
`

const Logo = styled(Link)`
    display: flex;
    align-items: center;
    float: left;
    text-decoration: none;
    z-index: 5;

    @media(min-width: 500px) {
        width: 120px;
        background: ${darkAccent}
        flex-direction: column;
        position: fixed;
        top: 20px;
    }

    @media(min-width: 1000px) {
        width: 160px;
        padding-top: 25px;
    }
`

const LogoImage = styled.img`
    width: 45px;
    margin: 8px;

    @media(min-width: 1000px) {
        width: 60px;
    }
`

const LogoText = styled.h1`
    color: ${whiteAccent};
    font-size: 24px;

    :hover {
        color: ${red};
    }

    @media(min-width: 500px) {
        font-size: 14px;
    }

    @media(min-width: 1000px) {
        font-size: 18px;
    }
`

const Menu = styled.div`
    background: linear-gradient(to right bottom, ${shadow}, ${mediumShadow}, ${darkAccent});
    min-height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    color: ${whiteAccent};
    z-index: 3;
    padding-top: 80px;
    position: absolute;
    top:0

    @media(min-width: 500px) {
        background: ${darkAccent};
        width: 120px;
        padding-top: 120px;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 3;
        height: 100%;
    }

    @media(min-width: 1000px) {
        width: 160px;
        padding-top: 160px;
    }
`

const StyledLink = styled(Link)`
    color: ${whiteAccent};
    text-decoration: none;
    padding: 10px;
    margin: 0 auto;
    width: 90%;
    border-bottom: 1px solid ${whiteAccent}

    :hover {
        color: ${red}
    }

    :active {
        color: ${shadow};
    }

    @media(min-width: 500px) {
        font-size: 14px;
        padding: 20px 0;
        text-align: center;
        color: ${whiteAccent};
    }

    @media(min-width: 1000px) {
        font-size: 18px;
        padding: 30px 0;
    }
`

const Ham = styled.label`
    color: ${whiteAccent};
    margin-right: 20px;
    z-index: 5;

    :hover {
        color: ${red};
    }

    @media(min-width: 500px) {
        display: none;
    }
`