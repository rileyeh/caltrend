import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { setCurrentFood, setCurrentMeal } from '../../ducks/reducers/meals'
import { Link } from 'react-router-dom'
import Nav from '../Nav/Nav'
import axios from 'axios';

class MealLog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            foods: []
        }
    }

    componentDidMount() {
        let meal_id = this.props.id
        axios.post('api/food', {meal_id}).then(res => {
            console.log('new meal log comp mounted', res)
            this.setState({
                foods: res.data
            })
        })
    }

    render() {
        return (
            <div>
                <Nav/>
                <h4>Meal Log</h4>
                <h3>{this.props.date} Meal {this.props.number}</h3>
                <Link to='foodsform'><button onClick={() => this.props.setCurrentMeal(this.props.currentMeal)}>add foods</button></Link>
                {this.state.foods.length !== 0 &&

                    this.state.foods.map((food, i) => {
                        console.log('each food from the new meal log', food)
                        return (
                            <div key={i}>
                                <h5>{food.food_name}</h5>
                                <p>{food.quantity}</p>
                                <p>{food.unit}</p>
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
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('state in the meal log', state)
    return {
        date: state.meals.currentMeal.date_created,
        number: state.meals.currentMeal.meal_number,
        id: state.meals.currentMeal.meal_id,
        currentMeal: state.meals.currentMeal
    }
}

export default connect(mapStateToProps, {setCurrentFood, setCurrentMeal})(MealLog)

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