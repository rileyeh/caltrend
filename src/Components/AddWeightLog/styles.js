import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { 
    darkBlue, 
    darkAccent, 
    whiteAccent 
} from '../../colors'

export const Body = styled.div`
    background: ${whiteAccent};
    max-width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;

    @media(min-width: 500px) {
        padding-left: 120px;
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

export const StyledDatePicker = styled(DatePicker)`
    margin: 0 auto;
    color: ${darkAccent};
    border: none;
    border-bottom: 1px solid ${darkAccent};
    border-radius: 0;
    background: ${whiteAccent};
    width: 60vw;
    padding-top: 30px;

    @media(min-width: 500px) {
        font-size: 22px;
    }
`