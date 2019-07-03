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
            foods: [],
            rerender: false
        }
    }

    componentDidMount() {
        let meal_id = this.props.id
        axios.post('api/food', {meal_id}).then(res => {
            this.setState({
                foods: res.data,
                rerender: true
            })
        }).catch(err => {
            console.log('error in the meal log', err)
        })
    }

    deleteFood = async id => {
        let meal_id = this.props.id

        await axios({
            method: 'DELETE',
            url: `/api/food/${id}`,
            data: {
                meal_id
            }
        }).then(res => {
            this.setState({
                foods: res.data,
                rerender: true
            })
        }).catch(err => {
            console.log('error in the meal log', err)
        })
    }

    render() {
        console.log(98765, this.props.currentMeal)
        return (
            <div>
                <Nav/>
                <label onClick={() => this.props.history.push('/foodlog')}>&#60;</label>
                <h4>Meal Log</h4>
                <h3>{this.props.date} Meal {this.props.number}</h3>
                <Link to='foodsform' onClick={() => this.props.setCurrentMeal(this.props.currentMeal)}>add foods</Link>


                {this.state.rerender &&

                    this.state.foods.map((food, i) => {
                        console.log('foods mapped in the food log', food)
                        return (
                            <div key={i}>
                                <h5>{food.food_name}</h5>
                                <p>{food.quantity}</p>
                                <p>{food.unit}</p>
                                <Link onClick={() => this.props.setCurrentFood(food)} to='/updatefood'>edit</Link>
                                <button onClick={() => this.deleteFood(food.food_id)}>delete</button>
                                <Nutrients>
                                    <p><span>calories</span><br/>{food.calories}</p>
                                    <p><span>protein</span><br/>{food.protein} g</p>
                                    <p><span>carbs</span><br/>{food.carbs} g</p>
                                    <p><span>fat</span><br/>{food.fat} g</p>
                                    <p><span>sugar</span><br/>{food.sugar} g</p>
                                    <p><span>fiber</span><br/>{food.fiber} g</p>
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