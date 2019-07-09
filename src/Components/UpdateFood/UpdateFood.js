import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Nav from '../Nav/Nav'
import { clearFoodSearch, setCurrentFood } from '../../ducks/reducers/meals'
import styled from 'styled-components'
import pencil from '../../assets/PencilDark.svg'


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

                <Body>
                
                <TopSection>
                <label onClick={() => this.props.history.push('/meallog')}>&#60;</label>
                <Title>{this.state.name.slice(0, -19).replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()})}</Title>
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
                    <Button onClick={this.updateDatabase}>add</Button>
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


// let shadow = '#787878'
// let mediumShadow = '#636363'
let darkAccent = '#5C5C5C'
let whiteAccent = '#F8F8F8'
// let lightBlue = '#50B6BB'
let mediumBlue = '#4BA9AD'
// let darkBlue = '#45969B'
let orange = '#FF6830'

const Body = styled.div`
    width: 100vw;
    background: ${whiteAccent};
    height: 95vh;
`

const TopSection = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding-top: 20px;
    margin-bottom: 20px;
`

const Title = styled.h2`
    text-align: center;
    color: ${mediumBlue};
`

const EditSection = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 20px;
`

const Button = styled.button`
  background: ${mediumBlue}
  border: none;
  width: 75px;
  height: 40px;
  border-radius: 8px;
  color: ${whiteAccent};
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;

  @media(min-width: 500px) {
    margin: 0 20px;
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
        font-weight: bold;
    }

    > p > span {
        font-weight: normal;
    }
`

const Image = styled.img`
    height: 25px;
    margin-left: 10px;
    position: relative;
    top: 5px;

    :hover{
        transform: translateY(-3px);
        height: 28px;
    }
    :active {
        transform: translateY(-1px);
    }
`