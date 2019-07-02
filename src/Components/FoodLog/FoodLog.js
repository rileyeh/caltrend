import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Nav from '../Nav/Nav'
import AddMealForm from '../AddMealForm/AddMealForm'
import {setCurrentFood, setCurrentMeal, setMealsArray} from '../../ducks/reducers/meals'
import { Redirect, Link } from 'react-router-dom'
import styled from 'styled-components'
import pencil from '../../assets/Pencil.svg'
import trash from '../../assets/Trash.svg'

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


        return (
            <div>
                <Nav />

                <Body>
                    <TopSection>
                        <Title>Food Log</Title>
                        <AddButton to='addmeal' onClick={this.toggleAddMealForm}>Add Meal</AddButton>
                    </TopSection>

                    {this.state.mealForm && 
                        <div>
                            <button onClick={this.toggleAddMealForm}>cancel</button>
                            <AddMealForm toggleAddMealForm={this.toggleAddMealForm}/>
                        </div>}

                    {this.state.meals.length !== 0 && 

                    this.state.meals.map((meal, i) => {
            
                        let mappedFoods = this.state.meals[i].foods.map((food, i) => {
                            return (
                                <div key={i}>
                                <h5>{food.food_name}</h5>
                                <MealButtons>edit</MealButtons>
                                <MealButtons onClick={() => this.deleteFood(food.food_id)}>delete</MealButtons>
                                
                                <Nutrients>
                                    <p>calories<br/>{food.calories}</p>
                                    <p>protein<br/>{food.protein}</p>
                                    <p>fat<br/>{food.fat}</p>
                                    <p>carbs<br/>{food.carbs}</p>
                                    <p>fiber<br/>{food.fiber}</p>
                                    <p>sugar<br/>{food.sugar}</p>
                                </Nutrients>
                                
                                </div>
                            )
                        })
            
                        return (
                            <Meal key={meal.meal_id} >
                                <MealHeader>
                                    <h3>{meal.date_created} Meal {meal.meal_number}</h3>
                                    <Image src={pencil} alt='' onClick={() => this.editMeal(meal.meal_id)}/>
                                    <Image src={trash} alt='' onClick={() => this.deleteMeal(meal.meal_id)}/>
                                </MealHeader>
                                {mappedFoods}
                            </Meal>
                        )
                    
                    })}
                </Body>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('state from the food log', state)
    return {
        meals: state.meals.mealsArray
    }
}

// let darkGreen = '#219653'
// let mediumGreen = '#2DB969'
let greenBlue ='#28b485'
let darkAccent = '#333333'
let lightAccent = '#F4F4F4'

export default connect(mapStateToProps, {setCurrentFood, setCurrentMeal, setMealsArray})(FoodLog)

const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const TopSection = styled.div`
    width: 90vw;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`

const Title = styled.h3`
color: ${greenBlue};
font-weight: bold;
font-size: 30px;
padding: 20px 0;
`

const AddButton = styled(Link)`
    width: 85px;
    height: 30px;
    border-radius: 8px;
    border: none;
    background: ${greenBlue};
    color: ${lightAccent};
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
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
`

const Meal = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid ${darkAccent}
`

const MealHeader = styled.div`
    width: 80vw;
    display: flex;
    padding-top: 5px;

`

const MealButtons = styled.button`
    width: 40px;
    height: 20px;
    background: ${greenBlue};
    border: none;
    margin: 5px;
    border-radius: 5px;
    color: ${lightAccent};
`

const Image = styled.img`
    height: 30px;
    width: 30px;
`
