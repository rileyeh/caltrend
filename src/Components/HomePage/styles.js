import styled from 'styled-components'
import citrus from '../../assets/bluecitrus.PNG'

import {
    whiteAccent,
    mediumBlue,
    darkBlue
} from '../../colors'

export const Body = styled.div`
    min-height: 100vh;
    min-width: 100vw;
    background: ${whiteAccent};
`

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
export const Logo = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
`

export const LogoImage = styled.img`
    width: 45px;
    margin: 8px;
`

export const LogoText = styled.h1`
    color: ${darkBlue};
`

export const Button = styled.button`
    height: 40px;
    width: 120px;
    background: ${whiteAccent};
    color: ${mediumBlue};
    border: 1px solid ${darkBlue};
    margin-right: 10px;
    border: none;
    font-size: 16px;

    &:hover {
        background: ${mediumBlue};
        color: ${whiteAccent};
        border-radius: 8px;
    }
`
export const Welcome = styled.div`
    height: 95vh;
    background-image: url(${citrus});
    background-size: cover;
    background-position: top;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 20px;

    > h1 {
        color: ${whiteAccent};
    }

    > p {
        color: ${whiteAccent};
    }


    @media(min-width: 500px) {
        font-size: 30px;
    }

    @media(min-width: 1000px) {
        font-size: 35px;
    }
`