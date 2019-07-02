import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Nav from '../Nav/Nav'
import { clearFoodSearch } from '../../ducks/reducers/meals'

class EditFoodForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            edit: false,
            add: false,
            name: '',
            calories: 0,
            protein: 0,
            fat: 0,
            carbs: 0,
            fiber: 0,
            sugar: 0,
            quantity: 0,
            unit: ''
        }
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    componentDidMount() {
        this.setState({
            name: this.props.name,
            calories: this.props.calories,
            protein: this.props.protein,
            fat: this.props.fat,
            carbs: this.props.carbs,
            fiber: this.props.fiber,
            sugar: this.props.sugar,
            quantity: this.props.quantity,
            unit: this.props.label
        })

        console.log(10439532, this.props.history)
    }

    // remember, these nutrients on state are objects, to get to the actual amount, you have to user calories.value and then calories.label

    updateNutrientInfo = () => {
        let {quantity, unit} = this.state
        let {calories, protein, fat, carbs, fiber, sugar} = this.props
        let nutrientsArray = [calories, protein, fat, carbs, fiber, sugar]

        let valuesArray = nutrientsArray.map(nutrient => {
            if(nutrient) {
                let {value} = nutrient
                return value
            } 
             return 0  
        })

        let updatedValues = []

        // if it was muffin and they kept it as muffin
        if (unit === this.props.label) {
            updatedValues = valuesArray.map(value => {
                return (value / this.props.quantity) * quantity
            })
        }

        // if the unit they chose matches the equivalency unit from the db/props
        if (unit === this.props.unit) {
            updatedValues = valuesArray.map(value => {
                return (value / this.props.eqv) * quantity
            })
        }

        // if we are going from grams to oz
        if(unit === 'oz' && this.props.unit === 'g') {
            updatedValues = valuesArray.map(value => {
                return (value / this.props.eqv) * 28.35 * quantity
            })
        }

        // if we are going from grams to pounds
        if(unit === 'lbs' && this.props.unit === 'g') {
            updatedValues = valuesArray.map(value => {
                return (value / this.props.eqv) * 28.25 * 16 * quantity
            })
        }

        // if we are going from ml to cups
        if(unit === 'cups' && this.props.unit === 'ml') {
            updatedValues = valuesArray.map(value => {
                return (value / this.props.eqv) * 236.588 * quantity
            })
        }

        // if we are going from ml to T
        if(unit === 'T' && this.props.unit === 'ml') {
            updatedValues = valuesArray.map(value => {
                return (value / this.props.eqv) * 14.787 * quantity
            })
        }

        // if we are going from ml to t
        if(unit === 't' && this.props.unit === 'ml') {
            updatedValues = valuesArray.map(value => {
                return (value / this.props.eqv) * 1.29 * quantity
            })
        }

        
        if (unit === 'ml' && this.props.unit === 'g'){
            return alert('does not compute (yet)')
        }
        if (unit === 'c' && this.props.unit === 'g'){
            return alert('does not compute (yet)')
        }
        if (unit === 'T' && this.props.unit === 'g'){
            return alert('does not compute (yet)')
        }
        if (unit === 't' && this.props.unit === 'g'){
            return alert('does not compute (yet)')
        }
        if (unit === 'g' && this.props.unit === 'ml'){
            return alert('does not compute (yet)')
        }
        if (unit === 'oz' && this.props.unit === 'ml'){
            return alert('does not compute (yet)')
        }
        if (unit === 'lbs' && this.props.unit === 'ml'){
            return alert('does not compute (yet)')
        }
            
        this.setState({
            calories: {...calories, value:updatedValues[0].toFixed(2)}, 
            protein: {...protein, value:updatedValues[1].toFixed(2)}, 
            fat: {...fat, value:updatedValues[2].toFixed(2)}, 
            carbs: {...carbs, value:updatedValues[3].toFixed(2)}, 
            fiber: {...fiber, value:updatedValues[4].toFixed(2)}, 
            sugar: {...sugar, value:updatedValues[5].toFixed(2)}
        })

        this.toggleEdit()
    }

    addToDatabase = () => {
       
        let calories 
        let protein 
        let fat 
        let carbs 
        let fiber 
        let sugar 

        if (this.state.calories) {
            calories = +this.state.calories.value
        } else {calories = 0}

        if (this.state.protein) {
            protein = +this.state.protein.value
        } else {protein = 0}

        if (this.state.fat) {
            fat = +this.state.fat.value
        } else {fat = 0}

        if (this.state.carbs) {
            carbs = +this.state.carbs.value
        } else {carbs = 0}

        if (this.state.fiber) {
            fiber = +this.state.fiber.value
        } else {fiber = 0}

        if (this.state.sugar) {
            sugar = +this.state.sugar.value
        } else {sugar = 0}



        let food_name = this.state.name
        let quantity = this.state.quantity
        let unit = this.state.unit
        let meal_id = this.props.id
  
        axios.post('/api/newFood', {
          food_name, 
          calories, 
          carbs, 
          protein, 
          fat, 
          fiber, 
          sugar, 
          quantity,
          unit,
          meal_id
        })
        .then(res => {
          console.log('response from the add food form', res)
        })

        this.props.clearFoodSearch()

        this.toggleAdd()

      }

      toggleEdit = () => {
          let { edit } = this.state 
          this.setState({
              edit: !edit
          })
      }

      toggleAdd = () => {
          this.setState({
              add: true
          })
      }

    render() {
        if (this.state.add) {
            return <Redirect to='/foodsform'/>;
          }

        return (
            <div>
                <Nav />
                
                <h4>{this.props.name}</h4>

                {this.state.edit
                ?
                <span>
                <input 
                name='quantity'
                placeholder={this.state.quantity}
                value={this.state.quantity}
                onChange={this.handleChange}/>

                <select
                name='unit'
                placeholder= 'select unit'
                value={this.state.label}
                onChange={this.handleChange}>
                    <option>{this.state.unit}</option>
                    <option>{this.props.label}</option>
                    <option>{this.props.unit}</option>
                    <option>oz</option>
                    <option>lbs</option>
                    <option>cups</option>
                    <option>T</option>
                    <option>t</option>

                    {/* {this.props.unit == 'g' 
                    ? 
                    <span>
                        <option>g</option>
                        <option>oz</option>
                        <option>lbs</option>
                    </span>
                    : 
                    <span>
                        <option>ml</option>
                        <option>cups</option>
                    </span>
                    } */}
                    
                    
                </select>
                <button onClick={this.toggleEdit}>cancel</button>
                <button onClick={this.updateNutrientInfo}>update</button>
                </span>
                :
                <span>
                    {this.state.quantity} {this.state.unit}
                    <button onClick={() => this.props.history.push('foodsform')}>back to search</button>
                    <button onClick={this.toggleEdit}>pencil</button>
                    <button onClick={this.addToDatabase}>add</button>
                </span>
                }
        

                <div>
                    <p>calories:</p>
                    
                    {this.state.calories 
                        ? 
                        <div>
                            {this.state.calories.value} {this.state.calories.unit}
                        </div>
                        : 
                        0.00}
                </div>

                <div>
                    <p>protein:</p>
                    
                    {this.state.protein 
                        ? 
                        <div>
                            {this.state.protein.value} {this.state.protein.unit} 
                        </div>
                        : 
                        0.00}
                </div>

                <div>
                    <p>carbs:</p> 
                    
                    {this.state.carbs 
                        ? 
                        <div>
                            {this.state.carbs.value} {this.state.carbs.unit} 
                        </div>
                        : 
                        0.00}
                </div>

                <div>
                    <p>fat:</p> 
                    
                    {this.state.fat 
                        ? 
                        <div>
                            {this.state.fat.value} {this.state.fat.unit}
                        </div>
                        : 
                        0.00}
                </div>

                <div>
                    <p>sugar:</p> 
                    
                    {this.state.sugar 
                        ? 
                        <div>
                            {this.state.sugar.value} {this.state.sugar.unit}
                        </div>
                        : 
                        0.00}
                </div>

                <div>
                    <p>fiber:</p>
                    
                    {this.state.fiber 
                        ? 
                        <div>
                            {this.state.fiber.value} {this.state.fiber.unit} 
                        </div>
                        : 
                        0.00}
                </div>
            </div>
        )
    }
}

let mapStateToProps = state => {
    console.log('STATE BY THE TIME WERE EDITING', state)
    return {
        id: state.meals.currentMeal.id,
        // date: state.meals.data.date,
        // number: state.meals.data.number,
        name: state.meals.currentFood.name,
        quantity: state.meals.currentFood.qty,
        label: state.meals.currentFood.label,
        eqv: state.meals.currentFood.eqv,
        unit: state.meals.currentFood.eunit,
        calories: state.meals.currentFood.calories,
        protein: state.meals.currentFood.protein,
        carbs: state.meals.currentFood.carbs,
        fat: state.meals.currentFood.fat,
        sugar: state.meals.currentFood.sugar,
        fiber: state.meals.currentFood.fiber
    }
}
 
export default connect(mapStateToProps, { clearFoodSearch })(EditFoodForm)