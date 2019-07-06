import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Nav from '../Nav/Nav'
import AddMealForm from '../AddMealForm/AddMealForm'
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
            mealForm: false,
            redirectToEdit: false
        }
    }

    componentDidMount() {
        axios.get('/api/meals').then(res => {
            this.getFoodByMeal(res)
        }).catch(err => console.log('error in the food log', err))
    }
    
    getFoodByMeal = res => {
        if (res.data.length > 0) {
        let mealArray = res.data

                mealArray.forEach(elem => {
                    elem.foods = []
                    axios.post('/api/food', elem).then(res => {
                        elem.foods = res.data
                        this.setState({
                            meals: mealArray
                        })
                        this.props.setMealsArray(this.state.meals)
                    })
                })
        }
        this.setState({
            meals: []
        })
    }

    deleteMeal = (meal_id) => {
        axios.delete(`/api/meal/${meal_id}`).then(res => {
            // alert('meal deleted')
            console.log('response from the db after delete', res)
            this.getFoodByMeal(res)
        }).catch(err => console.log('error in the food log', err))
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
        })
    }

      toggleAddMealForm = () => {
        let { mealForm } = this.state
        this.setState({
          mealForm: !mealForm
        })
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

                    {this.state.mealForm && 
                        <div>
                            <button onClick={this.toggleAddMealForm}>cancel</button>
                            <AddMealForm toggleAddMealForm={this.toggleAddMealForm}/>
                        </div>}

                    {this.state.meals.length !== 0 && 

                    this.state.meals.map((meal, i) => {

                        let calories = 0
                        let protein = 0
                        let fat = 0
                        let carbs = 0
                        let fiber = 0
                        let sugar = 0
            
                        this.state.meals[i].foods.forEach(food => {
                            calories += +food.calories
                            protein += +food.protein
                            fat += +food.fat
                            carbs += +food.carbs
                            fiber += +food.fiber
                            sugar += +food.sugar
                        })
            
                        return (
                            <Meal key={meal.meal_id} >
                                <MealHeader>
                                    <MealLink to='/meallog' onClick={() => this.props.setCurrentMeal(meal)}>{meal.date_created} Meal {meal.meal_number}</MealLink>
                                    <ImageContainer>
                                        <Image src={pencilLight} alt='' onClick={() => this.editMeal(meal.meal_id)}/>
                                        <Image src={trashLight} alt='' onClick={() => this.deleteMeal(meal.meal_id)}/>
                                    </ImageContainer>
                                </MealHeader>
                                <Nutrients>
                                    <p><span>calories</span><br/>{calories.toFixed(2)}</p>
                                    <p><span>protein</span><br/>{protein.toFixed(2)} g</p>
                                    <p><span>fat</span><br/>{fat.toFixed(2)} g</p>
                                    <p><span>carbs</span><br/>{carbs.toFixed(2)} g</p>
                                    <p><span>fiber</span><br/>{fiber.toFixed(2)} g</p>
                                    <p><span>sugar</span><br/>{sugar.toFixed(2)} g</p>
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
`

const TopSection = styled.div`
    width: 90vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
`
