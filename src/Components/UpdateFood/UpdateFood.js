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
            unit: '',
            eqv: 0,
            eunit: '',
            qty: 0,
            label: ''
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

            console.log('heres what the nutrients look like', calories)

            // we are just getting the food's plain information from the usda databse again, but we have the quantity and unit on redux state, so the props. these nutrients that we are getting back are objects with the value on them. that's what we'll manipulate. and that will be based on what we are getting from this.props.quantity and this.props.unit which match up with qty and label OR eqv and eunit. what we'll really look at is if this.props.unit === eunit or if this.props.unit === label. then, we'll do the calculations below (that came from box 2 on my ipad) based on which one it was. with this.props.quantity. then we'll update these variables that we've already set and then let setState run so that the state has the values according to what was put in.

            let valuesArray = [
                +calories.value,
                +protein.value,
                +carbs.value,
                +fat.value,
                +sugar.value,
                +fiber.value,
            ]

            let updatedValues = []

            // if it was muffin and they kept it as muffin
            // right here i could check which values are strings and numbers before i force them all to be numbers i guess. but also, safe to just set them all as numbers just in case
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
        })
       
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
        let {quantity, unit, calories, protein, fat, carbs, fiber, sugar} = this.state
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
        if (unit === this.state.label) {
            updatedValues = valuesArray.map(value => {
                return (value / this.state.qty) * quantity
            })
        }

        // if the unit they chose matches the equivalency unit from the db/props
        if (unit === this.state.eunit) {
            updatedValues = valuesArray.map(value => {
                return (value / this.state.eqv) * quantity
            })
        }

        // if we are going from grams to oz
        if(unit === 'oz' && this.state.eunit === 'g') {
            updatedValues = valuesArray.map(value => {
                return (value / this.state.eqv) * 28.35 * quantity
            })
        }

        // if we are going from grams to pounds
        if(unit === 'lbs' && this.state.eunit === 'g') {
            updatedValues = valuesArray.map(value => {
                return (value / this.state.eqv) * 28.25 * 16 * quantity
            })
        }

        // if we are going from ml to cups
        if(unit === 'cups' && this.state.eunit === 'ml') {
            updatedValues = valuesArray.map(value => {
                return (value / this.state.eqv) * 236.588 * quantity
            })
        }

        // if we are going from ml to T
        if(unit === 'T' && this.state.eunit === 'ml') {
            updatedValues = valuesArray.map(value => {
                return (value / this.state.eqv) * 14.787 * quantity
            })
        }

        // if we are going from ml to t
        if(unit === 't' && this.state.eunit === 'ml') {
            updatedValues = valuesArray.map(value => {
                return (value / this.state.eqv) * 1.29 * quantity
            })
        }

        
        if (unit === 'ml' && this.state.eunit === 'g'){
            return alert('does not compute (yet)')
        }
        if (unit === 'c' && this.state.eunit === 'g'){
            return alert('does not compute (yet)')
        }
        if (unit === 'T' && this.state.eunit === 'g'){
            return alert('does not compute (yet)')
        }
        if (unit === 't' && this.state.eunit === 'g'){
            return alert('does not compute (yet)')
        }
        if (unit === 'g' && this.state.eunit === 'ml'){
            return alert('does not compute (yet)')
        }
        if (unit === 'oz' && this.state.eunit === 'ml'){
            return alert('does not compute (yet)')
        }
        if (unit === 'lbs' && this.state.eunit === 'ml'){
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

    updateDatabase = id => {

        // the id should be a food_id 
        // these are the things that need to be passed as req.body
                let food_name = this.state.name
                let calories = this.state.calories.value
                let carbs = this.state.carbs.value
                let protein = this.state.protein.value
                let fat = this.state.calories.value
                let fiber = this.state.calories.value
                let sugar = this.state.calories.value
                let quantity = this.state.calories.value
                let unit = this.state.calories.value

        axios.put(`/api/food/${id}`, {}).then(res => {
            console.log('response from food update', res)
        }).catch(err => console.log('error in updateFood comp with update funtion', err))
    }


    render() {
        if (this.state.add) {
            return <Redirect to='/foodsform'/>;
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
                value={this.state.label}
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
                    <button onClick={() => this.props.history.push('foodsform')}>back to search</button>
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
    console.log('STATE BY THE TIME WERE EDITING', state)
    return {
        id: state.meals.currentMeal.id,
        name: state.meals.currentFood.name,
        ndbno: state.meals.currentFood.ndbno,
        quantity: state.meals.currentFood.quantity,
        unit: state.meals.currentFood.unit
    }
}
 
export default connect(mapStateToProps, { clearFoodSearch })(EditFoodForm)