import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Nav from '../Nav/Nav'
import {setCurrentFood, setCurrentMeal, setMealsArray, clearCurrentMeal} from '../../redux/reducers/meals'
import { Redirect } from 'react-router-dom'
import { Body, TopSection, Title, AddButton, MealContainer, Meal, MealHeader, MealLink, Nutrients } from './styles'

class FoodLog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            meals: [0],
            redirectToEdit: false
        }
    }

    componentDidMount = async () => {
        
        await axios.get('/api/mealsbydate').then(res => {
            let dates = res.data.map(meal => {
                return meal.exact_date
            })

            dates = Array.from(new Set(dates.map(date => new Date(date).toDateString())))

            let meals = dates.map(date => {
                let dateTotals = {
                    date, 
                    meal_id: 0,
                    calories: 0,
                    protein: 0,
                    carbs: 0,
                    fat: 0,
                    sugar: 0,
                    fiber: 0
                }
                return res.data.reduce((acc, meal) => {
                    return (date === meal.date_created) 
                    ? dateTotals = {
                        ...dateTotals,
                        meal_id: meal.meal_id,
                        calories: dateTotals.calories + +meal.calories,
                        protein: dateTotals.protein + +meal.protein,
                        carbs: dateTotals.carbs + +meal.carbs,
                        fat: dateTotals.fat + +meal.fat,
                        sugar: dateTotals.sugar + +meal.sugar,
                        fiber: dateTotals.fiber + +meal.fiber
                    }
                    : acc
                }, 0)
            })


            this.setState({
                meals
            })
        }).catch(err => console.log('error in main food log', err))
    }

    editMeal = id => {
        let mealToEdit = this.state.meals.find(meal => meal.meal_id === id)
        this.props.setCurrentMeal(mealToEdit)
        this.setState({
            redirectToEdit: true
        })
        // thinking we import setmeal from the redux state, and then we set the redux state using what we have here on state, finding the meal by the id which is omcing from the map, becasue thats wehre this function gets called
    }


    deleteFood = (id) => {
        axios.delete(`/api/food/${id}`).then(res => {
        }).catch(err => console.log('error in main food log', err))
    }
   
    render() {

        if (this.state.redirectToEdit) {
            return <Redirect to='/addmeal' />;
          }

          if (!this.props.user) {
            return <Redirect to='/' />
          }


        return (
            <div>
                <Nav />

                <Body>
                    <TopSection>
                        <Title>Food Log</Title>
                        <AddButton to='addmeal' onClick={this.props.clearCurrentMeal}>+</AddButton>
                    </TopSection>

                    
                    {this.state.meals[0] !== 0 &&

                    <MealContainer>
                    {this.state.meals.map(meal => {
                        return (
                                <Meal key={meal.meal_id} >
                                    <MealHeader>
                                        <MealLink to='/dayview' onClick={() => this.props.setCurrentMeal(meal)}>{meal.date}</MealLink>
                                    </MealHeader>
                                    <Nutrients>
                                        <p><span>calories</span><br/>{meal.calories.toFixed(2)}</p>
                                        <p><span>protein</span><br/>{meal.protein.toFixed(2)} g</p>
                                        <p><span>fat</span><br/>{meal.fat.toFixed(2)} g</p>
                                        <p><span>carbs</span><br/>{meal.carbs.toFixed(2)} g</p>
                                        <p><span>fiber</span><br/>{meal.fiber.toFixed(2)} g</p>
                                        <p><span>sugar</span><br/>{meal.sugar.toFixed(2)} g</p>
                                    </Nutrients>
                                </Meal>
                        )})}
                    </MealContainer>
                    }
                </Body>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let { data: user } = state.user
    return {
        meals: state.meals.mealsArray,
        user
    }
}


export default connect(mapStateToProps, {setCurrentFood, setCurrentMeal, setMealsArray, clearCurrentMeal})(FoodLog)