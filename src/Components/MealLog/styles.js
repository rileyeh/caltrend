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

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${whiteAccent};
    min-height: 90vh;

    @media(min-width: 500px) {
        margin-left: 120px;
    }

    @media(min-width: 1000px) {
        margin-left: 160px;
    }
`

export const TopBar = styled.div`
    width: 100%;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 10px;
    background: ${whiteAccent};

`

export const TopBarText = styled.div`
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    color: ${mediumBlue};

    > div {
        padding-left: 10px;
    }

    > label {
        color: ${darkAccent};
        font-weight: bold;
        font-size: 20px;

        :hover {
            color: ${red};
          }
    }
`

export const StyledLink = styled(Link)`
    text-decoration: none;
    width: 30px;
    height: 30px;
    background: ${darkBlue};
    color: ${whiteAccent};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    margin: 10px 0;
    font-size: 28px;
    font-weight: bold;

    :hover {
        background: ${red};
        transform: translateY(-3px);
        box-shadow: 0px 10px 16px ${shadow};
    }

    :active {
        transform: translateY(-1px);
        box-shadow: 0px 5px 8px ${mediumShadow};
    }
`

export const MealCard = styled.div`
    background: ${whiteAccent};
    padding-top: 10px;
`

export const CardHeader = styled.div`
    background: ${lightBlue};
    color: ${whiteAccent};
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    height: 55px;

    > span {
        width: 60%;
        font-weight: bold;
        padding-left: 5px;
        color: ${whiteAccent};
    }

    @media(min-width: 500px) {
        background: ${whiteAccent};
        border-bottom: 1px solid ${darkBlue};

        > span {
            color: ${lightBlue};
        }
    }
   
`

export const HeaderBottom = styled.div`
    display: flex;
    width: 40%;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;

     > p {
        color: ${whiteAccent};
    }

    @media(min-width: 500px) {

        > p {
            color: ${lightBlue};
        }
    }
`

export const Buttons = styled.div`
    width: 40%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`

export const Button = styled.button`
    background: none;
    border: none;
    margin: 0px 5px;

    :hover {
        transform: translateY(-3px);
        height: 28px;
        width: 28px;
    }

    :active {
        transform: translateY(-1px);
    }
`

export const Nutrients = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    > p {
        width: 100px;
        text-align: center;
        margin: 5px;
    }

    > p > span {
        font-weight: bold;
    }
`