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
            this.setState({
                meals: res.data
            }))
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