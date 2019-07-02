import React, { Component } from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import { setCurrentFood } from '../../ducks/reducers/meals'
import { Link } from 'react-router-dom'

class MealLog extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        let mappedFoods = this.props.foods.map((food, i) => {
            console.log('each food were mapping over', {food})
            return(
                <div key={i}>
                    <h4>{food.food_name}</h4>
                    <p>{food.quantity} {food.unit}</p>
                    <Link onClick={() => this.props.setCurrentFood(food)} to='/updatefood'>edit</Link>
                    <Nutrients>
                        <p><span>calories</span><br/>{food.calories}</p>
                        <p><span>protein</span><br/>{food.protein} g</p>
                        <p><span>carbs</span><br/>{food.carbs} g</p>
                        <p><span>fat</span><br/>{food.fat} g</p>
                        <p><span>fiber</span><br/>{food.fiber} g</p>
                        <p><span>sugar</span><br/>{food.sugar} g</p>
                    </Nutrients>
                </div>
            )
        })

        let calories = 0
        let protein = 0
        let fat = 0
        let carbs = 0
        let fiber = 0
        let sugar = 0

        this.props.foods.forEach(food => {
            calories += +food.calories
            protein += +food.protein
            fat += +food.fat
            carbs += +food.carbs
            fiber += +food.fiber
            sugar += +food.sugar 
        })

        return (
            <div>
                <h3>{this.props.date} Meal {this.props.number}</h3>
                {mappedFoods}
                <h4>Totals</h4>
                <Nutrients>
                    <p><span>calories</span><br/>{calories}</p>
                    <p><span>protein</span><br/>{protein} g</p>
                    <p><span>carbs</span><br/>{carbs} g</p>
                    <p><span>fat</span><br/>{fat} g</p>
                    <p><span>fiber</span><br/>{fiber} g</p>
                    <p><span>sugar</span><br/>{sugar} g</p>
                </Nutrients>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('redux state from the meal log', state)
    return {
        date: state.meals.currentMeal.date_created,
        number: state.meals.currentMeal.meal_number,
        foods: state.meals.currentMeal.foods
    }
}

export default connect(mapStateToProps, { setCurrentFood })(MealLog)

const Nutrients = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    > p {
        width: 100px;
        text-align: center;
        margin: 5px;
    }

    > p > span {
        font-weight: bold;
    }
`