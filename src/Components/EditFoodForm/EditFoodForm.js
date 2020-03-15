import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Nav from '../Nav/Nav'
import { clearFoodSearch } from '../../ducks/reducers/meals'
import pencil from '../../assets/PencilDark.svg'
import { Body, TopSection, Title, EditSection, Button, Nutrients, Image } from './styles'

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
            ndbno: 0
        }
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })

    }

    componentDidMount() {
        let { calories, protein, fat, carbs, fiber, sugar } = this.props
        let nutrients = [ calories, protein, fat, carbs, fiber, sugar ]
        nutrients.forEach(item => {
            if (!item) {
                item = 0.00
            }
        })
        this.setState({
            name: this.props.name,
            calories,
            protein,
            fat,
            carbs,
            fiber,
            sugar,
            quantity: this.props.quantity,
            unit: this.props.label,
            ndbno: this.props.ndbno
        })

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
        let ndbno = this.state.ndbno
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
          meal_id,
          ndbno
        })
        .then(res => {
          console.log('response from the edit food form', res)
        }).catch(err => console.log('error in edit food form', err))

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

          if (!this.props.user) {
            return <Redirect to='/' />
          }

        return (
            <div>
                <Nav />

                <Body>

                <TopSection>
                    <label onClick={() => this.props.history.push('/foodsform')}>&#60;</label>
                    <Title>{this.props.name.slice(0, -19).replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()})}</Title>
                </TopSection>

                {this.state.edit
                ?
                <EditSection>
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
                </select>
                <Button onClick={this.toggleEdit}>cancel</Button>
                <Button onClick={this.updateNutrientInfo}>update</Button>
                </EditSection>
                :
                <EditSection>
                    <div>
                        {this.state.quantity} {this.state.unit}
                        <Image src={pencil} alt='edit' onClick={this.toggleEdit}/>
                    </div>
                    <Button onClick={this.addToDatabase}>add</Button>
                </EditSection>
                }
        

                <Nutrients>
                <p>calories:<br/>
                {this.state.calories ? 
                    <span>{this.state.calories.value} {this.state.calories.unit}</span>
                    : <span>0.00 {this.state.sugar.unit}</span>}
                </p>
                <p>protein:<br/>
                {this.state.protein ? 
                    <span>{this.state.protein.value} {this.state.protein.unit}</span>
                    : <span>0.00 {this.state.sugar.unit}</span>}
                </p>
                <p>carbs:<br/>
                {this.state.carbs ? 
                    <span>{this.state.carbs.value} {this.state.carbs.unit}</span>
                    : <span>0.00 {this.state.sugar.unit}</span>}
                </p>
                <p>fat:<br/>
                {this.state.fat ? 
                    <span>{this.state.fat.value} {this.state.fat.unit}</span>
                    : <span>0.00 {this.state.sugar.unit}</span>}
                </p>
                <p>sugar:<br/>
                {this.state.sugar ? 
                    <span>{this.state.sugar.value} {this.state.sugar.unit}</span>
                    : <span>0.00 {this.state.sugar.unit}</span>}
                </p>
                <p>fiber:<br/>
                {this.state.fiber ? 
                    <span>{this.state.fiber.value} {this.state.fiber.unit}</span>
                    : <span>0.00 {this.state.sugar.unit}</span>}
                </p>
                </Nutrients>

                
            </Body>
            </div>
        )
    }
}

let mapStateToProps = state => {
    let { data: user } = state.user
    return {
        id: state.meals.currentMeal.meal_id,
        // date: state.meals.data.date,
        // number: state.meals.data.number,
        name: state.meals.currentFood.name,
        ndbno: state.meals.currentFood.dbnum,
        quantity: state.meals.currentFood.qty,
        label: state.meals.currentFood.label,
        eqv: state.meals.currentFood.eqv,
        unit: state.meals.currentFood.eunit,
        calories: state.meals.currentFood.calories,
        protein: state.meals.currentFood.protein,
        carbs: state.meals.currentFood.carbs,
        fat: state.meals.currentFood.fat,
        sugar: state.meals.currentFood.sugar,
        fiber: state.meals.currentFood.fiber,
        user
    }
}
 
export default connect(mapStateToProps, { clearFoodSearch })(EditFoodForm)