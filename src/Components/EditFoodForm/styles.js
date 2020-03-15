import styled from 'styled-components'

import {
    darkAccent,
    whiteAccent,
    mediumBlue,
    darkBlue,
    red
} from '../../colors'

export const Body = styled.div`
    max-width: 100vw;
    background: ${whiteAccent};
    min-height: 100vh;

    @media(min-width: 500px) {
        margin-left: 120px;
        padding-top: 20px;
    }

    @media(min-width: 1000px) {
        margin-left: 160px;
    }
`

export const TopSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    margin-bottom: 20px;
    padding-left: 10px;
    font-size: 16px;
    font-weight: bold;
    color: ${darkBlue};
    position: relative;

    @media(min-width: 500px) {
        justify-content: center;

        > label {
            position: absolute;
            top: -5px;
            left: 15px;
            font-size: 20px;
        }
    }
`

export const Title = styled.h2`
    text-align: center;
    color: ${mediumBlue};
`

export const EditSection = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 20px;
    font-size: 16px;

    > input {
        border: none;
        background: none;
        border-radius: 0;
        border-bottom: 1px solid ${darkAccent};
        width: 75px;
        text-align: center;
    }

    > select {
        background: none;
        border: none;
        border-radius: 0;
    }
`

export const Button = styled.button`
  background: ${mediumBlue}
  border: none;
  width: 75px;
  height: 40px;
  border-radius: 8px;
  color: ${whiteAccent};
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;

  :hover {
    background: ${red};
  }

  @media(min-width: 500px) {
    margin: 0 20px;
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
        font-weight: bold;
    }

    > p > span {
        font-weight: normal;
    }
`

export const Image = styled.img`
    height: 25px;
    margin-left: 10px;
    position: relative;
    top: 5px;

    :hover{
        transform: translateY(-3px);
        height: 28px;
    }
    :active {
        transform: translateY(-1px);
    }
`