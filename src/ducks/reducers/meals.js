
const WRITE_MEAL_ID = 'WRITE_MEAL_ID'

const intitialState = {
    meal_id: 0
}

export default function(state = intitialState, action) {
    let { type, payload } = action 

    switch(type) {
        case WRITE_MEAL_ID: 
            return {
                ...state,
                meal_id: payload
            }
        default: 
            return state
    }
}

export function writeMealId(id) {
    return {
    type: WRITE_MEAL_ID,
    payload: id
    }
}