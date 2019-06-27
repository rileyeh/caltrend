import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class EditFoodForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            edit: false,
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
            quantity: this.props.eqv,
            unit: this.props.eunit
        })
    }

    // remember, these nutrients on state are objects, to get to the actual amount, you have to user calories.value and then calories.label

    componentDidUpdate() {
        let {quantity, unit} = this.state


    }

    addToDatabase = () => {
        let food_name = this.state.name
        let calories = this.state.calories
        let protein = this.state.protein
        let fat = this.state.fat
        let carbs = this.state.carbs
        let fiber = this.state.fiber
        let sugar = this.state.sugar
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

      }

      toggleEdit = () => {
          let { edit } = this.state 
          this.setState({
              edit: !edit
          })
      }

    render() {
        return (
            <div>
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
                name='label'
                placeholder= {this.state.label}
                value={this.state.label}
                onChange={this.handleChange}>
                    <option>{this.props.unit}</option>
                    {this.props.unit == 'g' 
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
                    }
                    
                    
                </select>
                <button onClick={this.toggleEdit}>cancel</button>
                <button onClick={this.toggleEdit}>update</button>
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