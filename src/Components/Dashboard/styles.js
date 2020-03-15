import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { 
    shadow,
    mediumShadow,
    whiteAccent,
    lightBlue,
    darkBlue,
    red
} from '../../colors'


export const Body = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: ${whiteAccent};

  @media(min-width: 500px) {
    margin-left: 120px;
    justify-content: space-evenly;
  }

  @media(min-width: 1000px) {
    margin-left: 160px;
  }
`

export const Greeting = styled.h1`
  color: ${lightBlue};
  font-weight: bold;
  font-size: 30px;
  padding: 20px 0;

  @media(min-width: 500px) {
    font-size: 32px;
    padding: 30px 0;
  }

  @media(min-width: 1000px) {
    font-size: 36px;
  }
`

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 0 20px;

  @media(min-width: 500px) {
    width: 60%;
  }
`

export const ButtonLink = styled(Link)`
  background: ${darkBlue}
  width: 90px;
  height: 90px;
  border-radius: 50%;
  color: ${whiteAccent}
  font-size: 14px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

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