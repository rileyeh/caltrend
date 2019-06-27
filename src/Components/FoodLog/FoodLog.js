import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Nav from '../Nav/Nav'
import AddMealForm from '../AddMealForm/AddMealForm'
import {setCurrentFood} from '../../ducks/reducers/meals'
import { Redirect } from 'react-router-dom'

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

    deleteMeal = (meal_id) => {
        axios.delete(`/api/meal/${meal_id}`).then(res => {
            // alert('meal deleted')
            console.log('response from the db after delete', res)
            this.getFoodByMeal(res)
        }).catch(err => console.log('error in the food log', err))
    }

    editMeal = (meal_id) => {
        console.log('hey hey hey, make an update function')
    }

    getFoodByMeal = res => {
        if (res.data.length > 0) {
        let mealArray = res.data

                mealArray.forEach(elem => {
                    elem.foods = []
                    axios.post('/api/food', elem).then(res => {
                        elem.foods = res.data
                        this.setState({
                            meals: mealArray,
                        })
                    })
                })}
        this.setState({
            meals: []
        })
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

      redirectToEdit = obj => {
          this.props.setCurrentFood(obj)
          this.setState({
              redirectToEdit: true
          })
      }

    render() {

        if (this.state.redirectToEdit) {
            return <Redirect to='/editfood' />;
          }


        return (
            <div>
                <Nav />
                <h3>FoodLog</h3>
                <button onClick={this.toggleAddMealForm}>Add Meal</button>
                {this.state.mealForm && 
                    <div>
                        <button onClick={this.toggleAddMealForm}>cancel</button>
                        <AddMealForm/>
                    </div>}

                {this.state.meals.length !== 0 && 

                this.state.meals.map((meal, i) => {
        
                    let mappedFoods = this.state.meals[i].foods.map((food, i) => {
                        console.log('props on food', food)
                        return (
                            <div key={i}>
                            <h4>{food.food_name}</h4>
                            <button onClick={() => this.redirectToEdit(food)}>edit</button>
                            <button onClick={() => this.deleteFood(food.food_id)}>delete</button>
                            
                            <div style={styles.nutrients}>
                                <p>calories: {food.calories}</p>
                                <p>protein: {food.protein}</p>
                                <p>fat: {food.fat}</p>
                                <p>carbohydrates: {food.carbs}</p>
                                <p>fiber: {food.fiber}</p>
                                <p>sugar: {food.sugar}</p>
                            </div>
                            
                            </div>
                        )
                    })
        
                    return (
                        <div key={meal.meal_id} style={styles.mealBox}>
                            <p>date: {meal.date_created}</p>
                            <p>number: {meal.meal_number}</p>
                            <button onClick={() => this.deleteMeal(meal.meal_id)}>delete</button>
                            <button onClick={() => this.editMeal(meal.meal_id)}>edit</button>
                            {mappedFoods}
                        </div>
                    )
                   
                })}
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('state from the food log', state)
    return state
}

export default connect(mapStateToProps, {setCurrentFood})(FoodLog)

let styles = {
    mealBox: {
        borderBottom: '4px solid green'
    },
    nutrients: {
        display: 'flex'
    }
}