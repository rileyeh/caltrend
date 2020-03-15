import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../../ducks/reducers/user'
import whiteLogo from '../../assets/WhiteLogo.svg'
import blueLogo from '../../assets/LogoBlue.svg'
import { Header, Logo, LogoImage, LogoText, Menu, StyledLink, Ham } from './styles'

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