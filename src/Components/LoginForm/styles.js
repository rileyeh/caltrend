import styled from 'styled-components'

import {
    darkAccent,
    whiteAccent,
    mediumBlue
} from '../../colors'

 export const Body = styled.div`
    height: 90vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 60px;
    background: ${whiteAccent};

    @media(min-width: 500px) {
        position: absolute;
        top: 350px;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        height: 400px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.7);
    }
`

 export const TopBar = styled.div`
    width: 100%;
    height: 50px;
    background: ${darkAccent};
    color: ${whiteAccent};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    margin-bottom: 30px;

    > h4 {
        color: ${whiteAccent};
    }

    > label {
        color: ${whiteAccent};
    }
`

 export const LoginInput = styled.input`
    border: none;
    border-radius: 0;
    border-bottom: 1px solid ${darkAccent};
    background: ${whiteAccent};
    width: 70%;
    margin: 30px 0;
    font-size: 16px;
`

 export const AuthButton = styled.button`
    background: ${whiteAccent};
    color: ${mediumBlue};
    width: 75px;
    height: 30px;
    border: none;
    font-size: 16px;
    
    &:hover {
        border-radius: 8px;
        background: ${darkAccent};
        color: ${whiteAccent}
    }
`

 export const RegisterQ = styled.p`
    font-size: 16px;
    margin-top: 20px;
`