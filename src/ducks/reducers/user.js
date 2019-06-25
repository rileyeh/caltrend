import axios from 'axios'

const GET_USER = 'GET_USER'
const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'

const initialState = {
    data: null,
    loading: false
}

export default function(state = initialState, action) {
    let { type, payload } = action

    switch(type) {
        case GET_USER + '_PENDING':
            return {
                ...state, 
                loading: true
            }
        case GET_USER + '_FULFILLED':
            return {
                ...state,
                data: payload.data,
                loading: false
            }
        case GET_USER + '_REJECTED':
            return {
                ...state, 
                loading: false
            }


        case LOGIN_USER + '_PENDING':
            return {
                ...state, 
                loading: true
            }
        case LOGIN_USER + '_FULFILLED':
            return {
                ...state,
                data: payload.data,
                loading: false
            }
        case LOGIN_USER + '_REJECTED':
            return {
                ...state, 
                loading: false
            }



        case LOGOUT_USER + '_PENDING':
            return {
                ...state, 
                loading: true
            }
        case LOGOUT_USER + '_FULFILLED':
            return {
                ...state,
                data: null,
                loading: false
            }
        case LOGOUT_USER + '_REJECTED':
            return {
                ...state, 
                loading: false
            }

        default:
            return state
    }
}

export function getUser() {
    return {
        type: GET_USER,
        payload: axios.get('/auth/currentUser')
    }
}

export function login(loginInfo) {
    return {
        type: LOGIN_USER,
        payload: axios.post('/auth/login', loginInfo)
    }
}

export function logout() {
    return {
        type: LOGOUT_USER,
        payload: axios.get('/auth/logout')
    }
}