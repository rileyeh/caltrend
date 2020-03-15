import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Link } from 'react-router-dom'

import { 
    darkAccent, 
    whiteAccent, 
    darkBlue
} from '../../colors'

 export const Page = styled.div`
    @media(min-width: 500px) {
        display: flex;
    }
`

 export const Body = styled.div`
    background: ${whiteAccent};
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;

    @media(min-width: 500px) {
        margin-left: 120px;
    }

    @media(min-width: 1000px) {
        margin-left: 160px;
    }
`

 export const Title = styled.h3`
    color: ${darkAccent};
    font-weight: bold;
    font-size: 30px;
    padding: 20px 0;

    @media(min-width: 500px) {
    margin-left: 60px;
    padding-top: 40px;
    }

    @media(min-width: 1000px) {
    padding-top: 60px;
    }
`

 export const Input = styled.input`
    border: none;
    border-bottom: 1px solid ${darkAccent};
    border-radius: 0;
    background: none;
    width: 60vw;
    padding-top: 30px;

    @media(min-width: 500px) {
        font-size: 22px;
    }
`
 export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 80%;
    padding-top: 30px;
`

 export const Button = styled.button`
    background: ${darkBlue}
    border: none;
    width: 95px;
    height: 40px;
    border-radius: 8px;
    color: ${whiteAccent};
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
        background: ${darkAccent}
    }
`

 export const ButtonLink = styled(Link)`
    background: ${darkBlue}
    border: none;
    width: 95px;
    height: 40px;
    border-radius: 8px;
    color: ${whiteAccent};
    text-decoration: none;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
        background: ${darkAccent}
    }
`
 export const StyledDatePicker = styled(DatePicker)`
    margin: 0 auto;
    color: ${darkAccent};
    border: none;
    border-bottom: 1px solid ${darkAccent};
    border-radius: 0;
    background: ${whiteAccent}
    width: 60vw;
    padding-top: 30px;

    @media(min-width: 500px) {
        font-size: 22px;
    }
`