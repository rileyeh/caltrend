
const WRITE_MEAL_INFO = 'WRITE_MEAL_INFO'
const SET_CURRENT_FOOD = 'SET_CURRENT_FOOD'

const intitialState = {
    data: '',
    currentFood: {}
}

export default function(state = intitialState, action) {
    let { type, payload } = action 

    switch(type) {
        case WRITE_MEAL_INFO: 
            return {
                ...state,
                data: payload
            }
        case SET_CURRENT_FOOD:
            return {
                ...state, 
                currentFood: payload
            }
        default: 
            return state
    }
}

export function writeMealInfo(obj) {
    return {
    type: WRITE_MEAL_INFO,
    payload: obj
    }
}

export function setCurrentFood(obj){
    return {
        type: SET_CURRENT_FOOD,
        payload: obj
    }
}