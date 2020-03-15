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
    background: ${whiteAccent};
    min-height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media(min-width: 500px) {
        margin-left: 120px;
    }

    @media(min-width: 1000px) {
        margin-left: 160px;
    }
`


export const TopSection = styled.div`
    width: 90vw;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media(min-width: 500px) {
        width: 75vw;
        padding-left: 20px;
        padding: 20px 0;
    }
`

export const Title = styled.h3`
    color: ${lightBlue};
    font-weight: bold;
    font-size: 30px;
    padding: 20px 0;
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

export const CardHolder = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

export const WeightCard = styled.div`
    width: 150px;
    height: 150px;
    border-bottom: 1px solid ${red};
    font-size: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: ${lightBlue};
    position: relative;
    margin: 0 5px;

    @media(min-width: 500px) {
        width: 40vw;
        height: 100px;
        margin: 10px;
        flex-direction: row;
        justify-content: space-evenly;
    }
`

export const Buttons = styled.div`
    > button {
        display: none;
        border: none; 
    }
    
    @media(min-width: 500px) {
        width: 100%;
        height: 100%;
        position: absolute;
        text-align: center;

        
        &:hover {
            background: rgba(92, 92, 92, .6);
            display: flex;
            align-items: center;
            justify-content: space-evenly;

            > button {
                display: flex;
                justify-content: center;
                background: ${mediumBlue};
                width: 50px;
                height: 25px;
                border-radius: 4px;
                color: ${whiteAccent};

                :hover {
                    background: ${red};
                }

                :active {
                    background: ${whiteAccent};
                    color: ${darkAccent};
                }
            }
        }
    }
`

export const MobileButtons = styled.div`
    width: 100%;
    padding-top: 20px;
    display: flex;
    justify-content: space-evenly;

    > button {
        background: none;
        border: none;
    }
`   