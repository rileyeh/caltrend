import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

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
    }

    // remember, these nutrients on state are objects, to get to the actual amount, you have to user calories.value and then calories.label

    updateNutrientInfo = () => {
        let {calories, protein, fat, carbs, fiber, sugar, quantity, unit} = this.state
        let nutrientsArray = [calories, protein, fat, carbs, fiber, sugar]
        // function changeValues() {
        //     this.setState({
        //     calories: nutrientsArray[0], 
        //     protein: nutrientsArray[1], 
        //     fat: nutrientsArray[2], 
        //     carbs: nutrientsArray[3], 
        //     fiber: nutrientsArray[4], 
        //     sugar: nutrientsArray[5]
        // })}

        if (this.state.unit === this.props.label) {
            nutrientsArray.forEach(nutrient => {
                if(nutrient) {
                    let { value } = nutrient
                    return value = (value / this.props.quantity) * quantity
                } //might have to put something here for the nutrients that are undefined. but maybe not because they will just be skipped because they aren't truthy
            })
            this.setState({
                calories: nutrientsArray[0], 
                protein: nutrientsArray[1], 
                fat: nutrientsArray[2], 
                carbs: nutrientsArray[3], 
                fiber: nutrientsArray[4], 
                sugar: nutrientsArray[5]
            })
        }

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
            calories = this.state.calories.value
        } else {calories = 0}

        if (this.state.protein) {
            protein = this.state.protein.value
        } else {protein = 0}

        if (this.state.fat) {
            fat = this.state.fat.value
        } else {fat = 0}

        if (this.state.carbs) {
            carbs = this.state.carbs.value
        } else {carbs = 0}

        if (this.state.fiber) {
            fiber = this.state.fiber.value
        } else {fiber = 0}

        if (this.state.sugar) {
            sugar = this.state.sugar.value
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
                <h4>{this.props.name}</h4>

                {this.state.edit
                ?
                <span>
                <input 
                name='quantity'
                placeholder={this.props.quantity}
                value={this.state.quantity}
                onChange={this.handleChange}/>

                <select
                name='unit'
                placeholder= {this.props.label}
                value={this.state.label}
                onChange={this.handleChange}>
                    <option>{this.props.label}</option>
                    <option>{this.props.unit}</option>
                    <option>g</option>
                    <option>oz</option>
                    <option>lbs</option>
                    <option>ml</option>
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
        id: state.meals.data.id,
        date: state.meals.data.date,
        number: state.meals.data.number,
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
 
export default connect(mapStateToProps)(EditFoodForm)