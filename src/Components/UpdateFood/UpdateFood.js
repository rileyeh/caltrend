import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Nav from '../Nav/Nav'
import { clearFoodSearch, setCurrentFood } from '../../ducks/reducers/meals'

class EditFoodForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            edit: false,
            add: false,
            initialValues: [],
            name: '',
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
            sugar: 0,
            fiber: 0,
            quantity: 0,
            unit: '',
            eqv: 0,
            eunit: '',
            qty: 0,
            label: '',
            foodlog: false
        }
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    componentDidMount() {

        axios.get(`https://api.nal.usda.gov/ndb/V2/reports?ndbno=${this.props.ndbno}&type=b&format=json&api_key=ypLihhr1bxOT6RSZHDLPLbxzMVleTd0VaWKV9a8h`).then(res => {
            const result = res.data.foods[0]

            let name = result.food.desc.name
            let eqv = result.food.nutrients[0].measures[0].eqv
            let eunit = result.food.nutrients[0].measures[0].eunit
            let label = result.food.nutrients[0].measures[0].label
            let qty = result.food.nutrients[0].measures[0].qty
            let calories = result.food.nutrients.find(nutrient => nutrient.nutrient_id === '208')
            let protein = result.food.nutrients.find(nutrient => nutrient.nutrient_id === '203')
            let carbs = result.food.nutrients.find(nutrient => nutrient.nutrient_id === '205')
            let fat = result.food.nutrients.find(nutrient => nutrient.nutrient_id === '204')
            let sugar = result.food.nutrients.find(nutrient => nutrient.nutrient_id === '269')
            let fiber = result.food.nutrients.find(nutrient => nutrient.nutrient_id === '291')

            let nutrientsArray = [calories, protein, carbs, fat, sugar, fiber]

            let valuesArray = nutrientsArray.map(nutrient => {
                if(nutrient) {
                    let {value} = nutrient
                    return +value
                } 
                 return 0  
            })

            let updatedValues = []

            // if it was muffin and they kept it as muffin
            if (this.props.unit === label) {
                updatedValues = valuesArray.map(value => {
                    return (value / +qty) * +this.props.quantity
                })
            }

            // if the unit they chose matches the equivalency unit from the db/props
            if (this.props.unit === eunit) {
                updatedValues = valuesArray.map(value => {
                    return (value / +eqv) * +this.props.quantity
                })
            }
        
            this.setState({
                initialValues: nutrientsArray,
                name, 
                eqv,
                eunit,
                label,
                qty,
                calories: {...calories, value: updatedValues[0].toFixed(2)},
                protein: {...protein, value: updatedValues[1].toFixed(2)},
                carbs: {...carbs, value: updatedValues[2].toFixed(2)},
                fat: {...fat, value: updatedValues[3].toFixed(2)},
                sugar: {...sugar, value: updatedValues[4].toFixed(2)},
                fiber: {...fiber, value: updatedValues[5].toFixed(2)},
                quantity: this.props.quantity,
                unit: this.props.unit
            })
        }).catch(err => console.log('error in update food', err))
       
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

    updateNutrientInfo = () => {
        let {initialValues, calories, protein, carbs, fat, sugar, fiber,  label, qty, eqv, eunit, quantity, unit} = this.state

        let valuesArray = initialValues.map(nutrient => {
            if(nutrient) {
                let {value} = nutrient
                return +value
            } 
             return 0  
        })

        let updatedValues = []

        // if it was muffin and they kept it as muffin
        if (unit === label) {
             updatedValues = valuesArray.map(value => {
                return (value / qty) * quantity
            }) 
        } else if (unit === eunit) { // if the unit they chose matches the equivalency unit from the db/props
             updatedValues = valuesArray.map(value => {
                return (value / eqv) * quantity
            })
        } else if (unit === 'oz' && eunit === 'g') { // if we are going from grams to oz
             updatedValues = valuesArray.map(value => {
                return (value / eqv) * 28.35 * quantity
            })
        } else if (unit === 'lbs' && eunit === 'g') { // if we are going from grams to pounds
             updatedValues = valuesArray.map(value => {
                return (value / eqv) * 28.25 * 16 * quantity
            })
        } else if (unit === 'cups' && eunit === 'ml') { // if we are going from ml to cups
             updatedValues = valuesArray.map(value => {
                return (value / eqv) * 236.588 * quantity
            })
        } else if (unit === 'T' && eunit === 'ml') { // if we are going from ml to T
             updatedValues = valuesArray.map(value => {
                return (value / eqv) * 14.787 * quantity
            })
        } else if (unit === 't' && eunit === 'ml') { // if we are going from ml to t
             updatedValues = valuesArray.map(value => {
                return (value / eqv) * 1.29 * quantity
            })
        } else {
            alert('does not compute')
        }
            
        this.setState({
            calories: {...calories, value:updatedValues[0].toFixed(2)}, 
            protein: {...protein, value:updatedValues[1].toFixed(2)}, 
            carbs: {...carbs, value:updatedValues[2].toFixed(2)}, 
            fat: {...fat, value:updatedValues[3].toFixed(2)}, 
            sugar: {...sugar, value:updatedValues[4].toFixed(2)},
            fiber: {...fiber, value:updatedValues[5].toFixed(2)}
        })

        this.toggleEdit()
    }

    updateDatabase = () => {
        let food_name = this.state.name
        let calories = +this.state.calories.value
        let carbs = +this.state.carbs.value
        let protein = +this.state.protein.value
        let fat = +this.state.fat.value
        let fiber = +this.state.fiber.value
        let sugar = +this.state.sugar.value
        let quantity = +this.state.quantity
        let unit = this.state.unit
        let id = this.props.id
        let meal_id = this.props.currentMeal.meal_id

        axios.put(`/api/food/${id}`, {
            food_name, 
            calories, 
            carbs, 
            protein, 
            fat, 
            fiber, 
            sugar, 
            quantity, 
            unit,
            meal_id}).then(res => {
            this.props.setCurrentFood({
                food_name, 
                calories, 
                carbs, 
                protein, 
                fat, 
                fiber, 
                sugar, 
                quantity, 
                unit,
                meal_id})
        }).catch(err => console.log('error in updateFood comp with update funtion', err))

        this.setState({
            foodlog: true
        })
    }


    render() {
        if (this.state.add) {
            return <Redirect to='/foodsform'/>;
          }

          if (this.state.foodlog) {
            return <Redirect to='meallog'/>
        }

        if (!this.props.user) {
            return <Redirect to='/' />
          }

        return (
            

            <div>
                <Nav />
                
                <h4>{this.state.name}</h4>

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
                value={this.state.unit}
                onChange={this.handleChange}>
                    <option>{this.state.unit}</option>
                    <option>{this.state.label}</option>
                    <option>{this.state.eunit}</option>
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
                    <button onClick={() => this.props.history.push('meallog')}>back to meal log</button>
                    <button onClick={this.toggleEdit}>pencil</button>
                    <button onClick={this.updateDatabase}>add</button>
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




    // addToDatabase = () => {
       
    //     let calories 
    //     let protein 
    //     let fat 
    //     let carbs 
    //     let fiber 
    //     let sugar 

    //     if (this.state.calories) {
    //         calories = +this.state.calories.value
    //     } else {calories = 0}

    //     if (this.state.protein) {
    //         protein = +this.state.protein.value
    //     } else {protein = 0}

    //     if (this.state.fat) {
    //         fat = +this.state.fat.value
    //     } else {fat = 0}

    //     if (this.state.carbs) {
    //         carbs = +this.state.carbs.value
    //     } else {carbs = 0}

    //     if (this.state.fiber) {
    //         fiber = +this.state.fiber.value
    //     } else {fiber = 0}

    //     if (this.state.sugar) {
    //         sugar = +this.state.sugar.value
    //     } else {sugar = 0}



    //     let food_name = this.state.name
    //     let quantity = this.state.quantity
    //     let unit = this.state.unit
    //     let meal_id = this.props.id
  
    //     axios.post('/api/newFood', {
    //       food_name, 
    //       calories, 
    //       carbs, 
    //       protein, 
    //       fat, 
    //       fiber, 
    //       sugar, 
    //       quantity,
    //       unit,
    //       meal_id
    //     })
    //     .then(res => {
    //       console.log('response from the edit food form', res)
    //     })

    //     this.props.clearFoodSearch()

    //     this.toggleAdd()

    //   }

      

    


let mapStateToProps = state => {
    console.log('state in update food', state)
    let { data: user } = state.user
    return {
        currentMeal: state.meals.currentMeal,
        id: state.meals.currentFood.food_id,
        name: state.meals.currentFood.name,
        ndbno: state.meals.currentFood.ndbno,
        quantity: state.meals.currentFood.quantity,
        unit: state.meals.currentFood.unit,
        user
    }
}
 
export default connect(mapStateToProps, { clearFoodSearch, setCurrentFood })(EditFoodForm)