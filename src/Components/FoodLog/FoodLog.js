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
        axios.get('/api/meals').then(res => {

            let mealArray = res.data

                mealArray.forEach(elem => {
                    elem.foods = []
                    axios.post('/api/food', elem).then(res => {
                        elem.foods = res.data
                        this.setState({
                            meals: mealArray,
                        })
                    })
                })
        }).catch(err => console.log('error in the food log', err))
    }

    render() {
        return (
            <div>
                FoodLog
                {this.state.meals.length !== 0 && 

                this.state.meals.map((meal, i) => {
        
                    let mappedFoods = this.state.meals[i].foods.map((food, i) => {
                        return (
                            <div key={i}>{food.food_name}</div>
                        )
                    })
        
                    return (
                        <div key={meal.meal_id}>
                            <p>date: {meal.date_created}</p>
                          <p>number: {meal.meal_number}</p>
                        {mappedFoods}
                        </div>
                    )
                   
                })}
            </div>
        )
    }
}

export default FoodLog