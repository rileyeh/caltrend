import styled from 'styled-components'
import { Link} from 'react-router-dom'

import {
    shadow,
    mediumShadow,
    darkAccent,
    whiteAccent,
    lightBlue,
    darkBlue,
    red
} from '../../colors'

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${whiteAccent};
    min-height: 100vh;
    position: relative;
    max-width: 100vw;

    @media(min-width: 500px) {
        margin-left: 120px;
    }

    @media(min-width: 1000px) {
        margin-left: 160px;
    }
`
export const TopSection = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;

    > label {
        color: ${darkBlue};
        font-weight: bold;
        font-size: 20px;

        :hover {
            color: ${red};
          }
    }

    @media(min-width: 500px) {
        width: 95%;
    }
`

export const Title = styled.h3`
    color: ${lightBlue};
    font-weight: bold;
    font-size: 30px;
    padding: 20px 0;
    background: ${whiteAccent};
`

export const AddButton = styled(Link)`
    width: 30px;
    height: 30px;
    border-radius: 8px;
    border: none;
    background: ${darkBlue};
    color: ${whiteAccent};
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
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

export const Meal = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media(min-width: 500px) {
        width: 400px;
    }
`

export const MealHeader = styled.div`
    width: 95vw;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 5px;
    padding: 0 10px;
    color: ${darkBlue};
    border-bottom: 1px solid ${red};

    @media(min-width: 500px) {
        width: 400px;
    }
`

export const MealLink = styled(Link)`
    font-size: 18px;
    font-weight: bold;
    text-decoration: none;
    color: ${lightBlue}

    :hover {
        color: ${darkAccent}
    }
`

export const ImageContainer = styled.div`
    display: flex;
    align-items: center;
`


export const Image = styled.img`
    height: 25px;
    width: 25px;
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
