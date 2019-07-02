
const SET_MEALS_ARRAY = 'SET_MEALS_ARRAY'
const SET_CURRENT_MEAL = 'SET_CURRENT_MEAL'
const CLEAR_CURRENT_MEAL = 'CLEAR_CURRENT_MEAL'
const SET_CURRENT_FOOD = 'SET_CURRENT_FOOD'
const SET_FOOD_SEARCH = 'SET_FOOD_SEARCH'
const CLEAR_FOOD_SEARCH = 'CLEAR_FOOD_SEARCH'

const intitialState = {
    currentMeal: {},
    currentFood: {},
    mealsArray: [],
    results: []
}

export default function(state = intitialState, action) {
    let { type, payload } = action 

    switch(type) {
        case SET_MEALS_ARRAY:
            return {
                ...state, 
                mealsArray: payload
            }
        case SET_CURRENT_MEAL:
            return {
                ...state, 
                currentMeal: payload
            }
        case CLEAR_CURRENT_MEAL:
            return {
                ...state, 
                currentMeal: {}
            }
        case SET_CURRENT_FOOD:
            return {
                ...state, 
                currentFood: payload
            }
        case SET_FOOD_SEARCH:
            return {
                ...state,
                results: payload
        }
        case CLEAR_FOOD_SEARCH:
            return {
                ...state, 
                results: []
            }
        default: 
            return state
    }
}

export function setMealsArray(arr) {
    return {
        type: SET_MEALS_ARRAY,
        payload: arr
    }
}

export function setCurrentFood(obj) {
    return {
        type: SET_CURRENT_FOOD,
        payload: obj
    }
}

export function setCurrentMeal(obj) {
    return {
        type: SET_CURRENT_MEAL,
        payload: obj
    }
}

export function clearCurrentMeal() {
    return {
        type: CLEAR_CURRENT_MEAL
    }
}

export function setFoodSearch(arr) {
    return {
        type: SET_FOOD_SEARCH,
        payload: arr
    }
}

export function clearFoodSearch() {
    return {
        type: CLEAR_FOOD_SEARCH
    }
}