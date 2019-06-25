import React, { Component } from 'react'
import axios from 'axios'

class FoodLog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            meals: []
        }
    }

    componentDidMount() {
        axios.get('/api/meals').then(res =>
            console.log('HERE IS THE RES DATA', res.data))
            // this.setState({
            //     meals: res.data
            // }))
            let meal_id = 23
        axios.post('/api/food', meal_id).then(res => {
            console.log('RESPONSE THAT WILL HOPEFULLY BE THE FOODS THAT MATCH MEAL 23', res)
        })
    }

    render() {
        let mappedMeals = this.state.meals.map(meal => {
            console.log(12345678, meal)
            return(
                <div key={meal.meal_id}>
                    <p>date: {meal.date_created}</p>
                    <p>number: {meal.meal_number}</p>
                </div>
            )
        })
        return (
            <div>
                FoodLog
                {mappedMeals}
            </div>
        )
    }
}

export default FoodLog