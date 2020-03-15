import styled from 'styled-components'
import { Link } from 'react-router-dom'

import {
    shadow, 
    mediumShadow, 
    darkAccent, 
    whiteAccent, 
    lightBlue, 
    mediumBlue, 
    darkBlue, 
    red
} from '../../colors'

export const Header = styled.div`
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

export const Logo = styled(Link)`
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

export const LogoImage = styled.img`
    width: 45px;
    margin: 8px;

    @media(min-width: 1000px) {
        width: 60px;
    }
`

export const LogoText = styled.h1`
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

export const Menu = styled.div`
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

export const StyledLink = styled(Link)`
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

export const Ham = styled.label`
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