import React, { Component } from 'react'
import axios from 'axios'

class FoodLog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            meals: [],
            dropDown: false
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

    deleteMeal = (id) => {
        axios.delete(`/api/meal/:${id}`).then(res => {
            console.log(56789, res)
        })
    }

    toggleDropDown = () => {
        let { dropDown } = this.state
        this.setState({
          dropDown: !dropDown
        })
      }

    render() {
        return (
            <div>
                FoodLog
                {this.state.meals.length !== 0 && 

                this.state.meals.map((meal, i) => {
        
                    let mappedFoods = this.state.meals[i].foods.map((food, i) => {
                        console.log('props on food', food)
                        return (
                            <div key={i}>
                            <h4>{food.food_name}
                            <span>
                                <button onClick={this.toggleDropDown}>^</button>
                                <button onClick={() => this.deleteMeal(food.meal_id)}>delete</button>
                            </span></h4>
                            {this.state.dropDown &&
                            <div>
                                <p>calories: {food.calories}</p>
                                <p>protein: {food.protein}</p>
                                <p>fat: {food.fat}</p>
                                <p>carbohydrates: {food.carbs}</p>
                                <p>fiber: {food.fiber}</p>
                                <p>sugar: {food.sugar}</p>
                            </div>
                            }
                            </div>
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