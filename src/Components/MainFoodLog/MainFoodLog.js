import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Nav from '../Nav/Nav'
import {setCurrentFood, setCurrentMeal, setMealsArray, clearCurrentMeal} from '../../ducks/reducers/meals'
import { Redirect, Link } from 'react-router-dom'
import styled from 'styled-components'

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
            console.log('food log mount response', res)
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
            console.log(7489123847, res)
        }).catch(err => console.log('error in main food log', err))
    }
   
    render() {

        if (this.state.redirectToEdit) {
            return <Redirect to='/addmeal' />;
          }

          if (!this.props.user) {
            return <Redirect to='/' />
          }

          console.log('the state in main food log', this.state)

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

let shadow = '#787878'
let mediumShadow = '#636363'
let darkAccent = '#5C5C5C'
let whiteAccent = '#F8F8F8'
let lightBlue = '#50B6BB'
// let mediumBlue = '#4BA9AD'
let darkBlue = '#45969B'
let red = '#FF5757'

const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${whiteAccent};
    min-height: 100vh;

    @media(min-width: 500px) {
        margin-left: 120px;
    }

    @media(min-width: 1000px) {
        margin-left: 160px;
    }
`

const TopSection = styled.div`
    width: 90vw;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media(min-width: 500px) {
        width: 80vw;
    }
`

const Title = styled.h3`
    color: ${lightBlue};
    font-weight: bold;
    font-size: 30px;
    padding: 20px 0;
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

    :hover {
        background: ${red};
        transform: translateY(-3px);
        box-shadow: 0px 10px 16px ${shadow};
    }

    :active {
        transform: translateY(-1px);
        box-shadow: 0px 5px 8px ${mediumShadow};
    }
`

const MealContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    
`

const Meal = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    padding-bottom: 20px;

    @media(min-width: 500px) {
        width: 300px;
    }
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
    border-bottom: 1px solid ${red};

    @media(min-width: 500px) {
        width: 250px;
    }
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

    @media(min-width: 500px) {
        width: 250px;
        
    }
`