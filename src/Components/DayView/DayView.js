import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Nav from '../Nav/Nav'
import {setCurrentFood, setCurrentMeal, setMealsArray, clearCurrentMeal} from '../../ducks/reducers/meals'
import { Redirect, Link } from 'react-router-dom'
import styled from 'styled-components'
import pencilLight from '../../assets/PencilDark.svg'
import trashLight from '../../assets/TrashDark.svg'

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
            console.log('the original response', res)
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
            console.log('final result', meals)

            this.setState({
                meals
            })

        }).catch(err => console.log('error in the food log', err))
    }

    deleteMeal = async (meal_id) => {
        let date_created = this.state.date
        console.log('the date sent to the db', date_created)
        await axios({
            method: 'DELETE',
            url: '/api/meal',
            data: {
                meal_id,
                date_created
            }
        }).then(res => {
            console.log('the delete response',res.data)
        }).catch(err => {
            console.log('error deleting in day view', err)
        })


        axios.get('/api/mealsbydate').then(res => {
            console.log('response in day view', res)
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
        // thinking we import setmeal from the redux state, and then we set the redux state using what we have here on state, finding the meal by the id which is omcing from the map, becasue thats wehre this function gets called
    }


    deleteFood = () => {
        let id = this.props.currentMeal.meal_id
        axios.delete(`/api/food/${id}`).then(res => {
            console.log(7489123847, res)
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
    console.log('state in the day view', state)
    let { data: user } = state.user
    return {
        currentMeal: state.meals.currentMeal,
        meals: state.meals.mealsArray,
        user
    }
}


export default connect(mapStateToProps, {setCurrentFood, setCurrentMeal, setMealsArray, clearCurrentMeal})(FoodLog)

let darkAccent = '#5C5C5C'
let whiteAccent = '#F8F8F8'
let lightBlue = '#50B6BB'
// let mediumBlue = '#4BA9AD'
let darkBlue = '#45969B'
let orange = '#FF6830'

const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${whiteAccent};
    min-height: 100vh;
    position: relative;
`
const TopSection = styled.div`
    width: 90vw;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > label {
        color: ${darkBlue};
        font-weight: bold;
        font-size: 20px;
    }
`

const Title = styled.h3`
    color: ${lightBlue};
    font-weight: bold;
    font-size: 30px;
    padding: 20px 0;
    background: ${whiteAccent};
`

const AddButton = styled(Link)`
    width: 30px;
    height: 30px;
    border-radius: 8px;
    border: none;
    background: ${darkBlue};
    color: ${whiteAccent};
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-weight: bold;
`

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

const Meal = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const MealHeader = styled.div`
    width: 95vw;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 5px;
    padding: 0 10px;
    color: ${darkBlue};
    border-bottom: 1px solid ${orange};
`

const MealLink = styled(Link)`
    font-size: 18px;
    font-weight: bold;
    text-decoration: none;
    color: ${lightBlue}

    :hover {
        color: ${darkAccent}
    }
`

const ImageContainer = styled.div`
    display: flex;
    align-items: center;
`


const Image = styled.img`
    height: 25px;
    width: 25px;
    margin: 0px 5px;

    :hover {
        transform: translateY(-3px);
        height: 28px;
        width: 28px;
    }

    :active {
        transform: translateY(-1px);
    }
`
