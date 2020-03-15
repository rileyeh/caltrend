import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Nav from '../Nav/Nav'
import {setCurrentFood, setCurrentMeal, setMealsArray, clearCurrentMeal} from '../../ducks/reducers/meals'
import { Redirect } from 'react-router-dom'
import pencilLight from '../../assets/PencilDark.svg'
import trashLight from '../../assets/TrashDark.svg'
import { Body, TopSection, Title, AddButton, Nutrients, Meal, MealHeader, MealLink, ImageContainer, Image } from './styles'

class FoodLog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            meals: [],
            date: '',
            redirectToEdit: false
        }
    }

    componentDidMount() {
        if (this.props.currentMeal.date) {
        this.setState({
            date: this.props.currentMeal.date
        })} else if (this.props.currentMeal.date_created) {
            this.setState({
                date: this.props.currentMeal.date_created
        })} else {
            this.setState({
                date: 'no date'
            })
        }

        axios.get('/api/mealsbydate').then(res => {
            let initialMeals = res.data.filter(meal => {
                return meal.date_created === this.state.date
            })

            let mealNumbers = Array.from(new Set(initialMeals.map(meal => meal.meal_number)))


            let meals = mealNumbers.map(number => {
                let meal = {
                    date_created: initialMeals[0].date_created,
                    exact_date: initialMeals[0].exact_date,
                    meal_id: initialMeals[0].meal_id,
                    user_id: initialMeals[0].user_id,
                    meal_number: number,
                    calories: 0,
                    protein: 0,
                    carbs: 0,
                    fat: 0,
                    sugar: 0,
                    fiber: 0
                }
                return initialMeals.reduce((acc, item) => {
                    return (number === +item.meal_number) ? 
                    meal = {
                        ...meal,
                        calories: meal.calories + +item.calories,
                        protein: meal.protein + +item.protein,
                        carbs: meal.carbs + +item.carbs,
                        fat: meal.fat + +item.fat,
                        sugar: meal.sugar + +item.sugar,
                        fiber: meal.fiber + +item.fiber
                    }
                    :
                    acc
                }, 0)
            })

            this.setState({
                meals
            })

        }).catch(err => console.log('error in the food log', err))
    }

    deleteMeal = async (meal_id) => {
        let date_created = this.state.date
        await axios({
            method: 'DELETE',
            url: '/api/meal',
            data: {
                meal_id,
                date_created
            }
        }).then(res => {
        }).catch(err => {
            console.log('error deleting in day view', err)
        })


        axios.get('/api/mealsbydate').then(res => {
            let meals = res.data.filter(meal => {
                return meal.date_created === this.state.date
            })
            this.setState({
                meals
            })
        }).catch(err => console.log('error in the food log', err))

    }

    editMeal = meal => {
        this.props.setCurrentMeal(meal)
        this.setState({
            redirectToEdit: true
        })
    }


    deleteFood = () => {
        let id = this.props.currentMeal.meal_id
        axios.delete(`/api/food/${id}`).then(res => {
        }).catch(err => console.log('error in the food log', err))
    }

    render() {

        if (this.state.redirectToEdit) {
            return <Redirect to='/addmeal' />
          }

          if (!this.props.user) {
            return <Redirect to='/' />
          }

        return (
            <div>
                <Nav />

                <Body>

                    {this.state.date === 'no date' ?
                    <div>
                        <p>hmmm...no date selected<span onClick={() => this.props.history.push('/foodlog')}>head back to the food log</span></p>

                    </div>
                :
                    <TopSection>
                        <label onClick={() => this.props.history.push('/foodlog')}>&lt;</label>
                        <Title>{this.state.date}</Title>
                        <AddButton to='addmeal'>+</AddButton>
                    </TopSection>
                }
                    
                    

                    {this.state.meals.length !== 0 && 

                    this.state.meals.map((meal, i) => {
                        return (
                            <Meal key={i} >
                                <MealHeader>
                                    <MealLink to='/meallog' onClick={() => this.props.setCurrentMeal(meal)}>Meal {meal.meal_number}</MealLink>
                                    <ImageContainer>
                                        <Image src={pencilLight} alt='' onClick={() => this.editMeal(meal)}/>
                                        <Image src={trashLight} alt='' onClick={() => this.deleteMeal(meal.meal_id)}/>
                                    </ImageContainer>
                                </MealHeader>
                                <Nutrients>
                                    <p><span>calories</span><br/>{+meal.calories.toFixed(2)}</p>
                                    <p><span>protein</span><br/>{+meal.protein.toFixed(2)} g</p>
                                    <p><span>fat</span><br/>{+meal.fat.toFixed(2)} g</p>
                                    <p><span>carbs</span><br/>{+meal.carbs.toFixed(2)} g</p>
                                    <p><span>fiber</span><br/>{+meal.fiber.toFixed(2)} g</p>
                                    <p><span>sugar</span><br/>{+meal.sugar.toFixed(2)} g</p>
                                </Nutrients>
                            </Meal>
                        )
                    
                    })}
                    

                </Body>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let { data: user } = state.user
    return {
        currentMeal: state.meals.currentMeal,
        meals: state.meals.mealsArray,
        user
    }
}


export default connect(mapStateToProps, {setCurrentFood, setCurrentMeal, setMealsArray, clearCurrentMeal})(FoodLog)