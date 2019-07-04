const SET_CURRENT_WEIGHT = 'SET_CURRENT_WEIGHT'

const initialState = {
    currentWeight: {}
}

export default function(state = initialState, action) {
    let { type, payload } = action
    
    switch(type) {
        case SET_CURRENT_WEIGHT: 
            return {
                ...state,
                currentWeight: payload
            }
        default:
            return state
    }
}

export function setCurrentWeight(obj) {
    return {
        type: SET_CURRENT_WEIGHT,
        payload: obj
    }
}