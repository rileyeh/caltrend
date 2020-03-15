import styled from 'styled-components'
import { Link } from 'react-router-dom'

import {  
    darkAccent, 
    whiteAccent, 
    mediumBlue, 
    red
} from '../../colors'


export const Body = styled.div`
  background: ${whiteAccent}
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media(min-width: 500px) {
    margin-left: 120px;
    align-items: flex-start;
  }

  @media(min-width: 1000px) {
    margin-left: 160px;
  }
`

export const MealTitle = styled.h1`
  color: ${mediumBlue};
  font-weight: bold;
  font-size: 30px;
  padding: 20px 0;

  @media(min-width: 500px) {
    margin-left: 40px;
  }
`

export const ButtonLink = styled(Link)`
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

  :hover {
    background: ${red};
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

export const Search = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100vw;
  padding-bottom: 10px;

  @media(min-width: 500px) {
    width: 60vw;
    margin-left: 40px;
    justify-content: flex-start;
  }
`
export const SearchBar = styled.input`
  border: none;
  border-radius: 0px;
  border-bottom: 1px solid ${darkAccent};
  width: 40%;
  background: ${whiteAccent};
`

export const List = styled.div`
  background: ${whiteAccent};
  display: flex;
  align-items: center;
  margin: 0 15px;
  padding: 0 10px;
  justify-content: space-evenly;
  text-align: center;
  border-bottom: 1px solid ${red};
  width: 90vw;
  padding: 5px 0;
  margin-bottom: 5px;
  color: ${darkAccent}

  > h4 {
    font-size: 14px;
  }

  > p {
    color: ${darkAccent};
  }

  > button {
    background: none;
    border: none;
    color: ${mediumBlue};
    font-size: 20px;
  }

  @media(min-width: 500px) {
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 60vw;
    margin-left: 40px;

    > button {
      margin-left: 10px;
    }
  }
`

export const ResultList = styled.div`
background: ${whiteAccent};
display: flex;
align-items: center;
margin: 0 15px;
padding: 0 10px;
justify-content: space-evenly;
text-align: center;
border-bottom: 1px solid ${red};
width: 90vw;
padding: 5px 0;
margin-bottom: 5px;
color: ${darkAccent};


:hover {
  background: rgba(92, 92, 92, .3);
}

> h4 {
  font-size: 14px;
}

> p {
  color: ${darkAccent};
}

> button {
  background: none;
  border: none;
  color: ${mediumBlue};
  font-size: 20px;
}

@media(min-width: 500px) {
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 60vw;
  margin-left: 40px;

  > button {
    margin-left: 10px;
  }
}
`