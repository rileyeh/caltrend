import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { setCurrentFood, setFoodSearch, clearCurrentMeal } from '../../ducks/reducers/meals'
import { Redirect } from 'react-router-dom'
import Nav from '../Nav/Nav'
import {Body, MealTitle, ButtonLink, Button, Search, SearchBar, List, ResultList } from './styles'

class AddFoodForm extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            food: '',
            resultsList: [],
            currentFood: {
              food: {
                nutrients: []
              }
            },
            foodList: [],
            dropDown: false,
            search: false,
            redirect: false
        }
    }


    componentDidMount() {
      if(this.props.id) {
      let {id} = this.props
       axios.get(`/api/meal/${id}`).then(res => {
        let currentMeal = res.data[0]
        axios.get(`/api/food/${currentMeal.meal_id}`).then(res => {
          this.setState({
            foodList: res.data,
            resultsList: this.props.results,
          })
        }).catch(err => console.log('error in the food log', err))
      }).catch(err => console.log('error in the food log', err))
    }
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    search = async (val) => {
        let res = await axios.get(`https://api.nal.usda.gov/ndb/search/?format=json&q=${val}&max=25&sort=n&api_key=ypLihhr1bxOT6RSZHDLPLbxzMVleTd0VaWKV9a8h`).catch(err => console.log('error in add food form', err))
        const initialList = res.data.list.item
        let resultsList = []
        initialList.map(item => {
          let name = item.name.slice(0, -19).replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()})
          return resultsList.push(name)
        })
        this.setState({
          resultsList: initialList
        })

        this.props.setFoodSearch(initialList)
      }

    addToState = async (ndbno) => {
      const res = await axios.get(`https://api.nal.usda.gov/ndb/V2/reports?ndbno=${ndbno}&type=b&format=json&api_key=ypLihhr1bxOT6RSZHDLPLbxzMVleTd0VaWKV9a8h`).catch(err => console.log('error in add food form', err))
      const result = res.data.foods[0]

      let name = result.food.desc.name
      let dbnum = +result.food.desc.ndbno
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
      
      let food = {
        name, 
        dbnum,
        eqv,
        eunit,
        label,
        qty,
        calories,
        protein,
        carbs,
        fat,
        sugar,
        fiber
      }

      this.props.setCurrentFood(food)

      this.setState({
        resultsList: [],
        edit: true,
        search: false,
      })
    
      this.toggleRedirect()
    }


    toggleRedirect = () => {
      this.setState({
        redirect: true
      })
    }

    handleSearchSubmit = () => {
      this.search(this.state.food)
      this.setState({
        food: '',
        search: true
      })
    }

    handleAddFood = (ndbno) => {
      this.addToState(ndbno)
    }

    toggleDropDown = () => {
      let { dropDown } = this.state
      this.setState({
        dropDown: !dropDown
      })
    }

    render() {
      if (this.state.redirect) {
        return <Redirect to='/editfood' />;
      }

      if (!this.props.user) {
        return <Redirect to='/' />
      }
       
        return (

            <div>

              <Nav />

              <Body>

                    <MealTitle>{this.props.date} Meal {this.props.number}</MealTitle>
                  
                    <div>
                      {this.state.foodList.length !== 0 && 

                      this.state.foodList.map((food, i) => {
                          return (
                          <List key={i}>
                            <h4>{food.food_name.slice(0, -19).replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()})}</h4>
                            <p>{food.calories} calories</p>
                          </List>
                        )
                      })
                      }
                    </div>

                    <Search>
                      <SearchBar
                        onChange={e => this.handleChange(e)}
                        name='food'
                        type='text'
                        value={this.state.food} />
                      <Button onClick={this.handleSearchSubmit}>search</Button>
                      <ButtonLink onClick={() => this.props.clearCurrentMeal} to='/meallog'>done</ButtonLink>
                    </Search>            
                
                  <div>
                    {this.state.resultsList.length !== 0 &&
                       this.state.resultsList.map((food, i) => {
                      let {name} = food
                      name = name.slice(0, -19).replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()})

                        return (
                          <ResultList key={i} onClick={() => this.handleAddFood(food.ndbno)}>
                                <p>{name}</p>
                                <button>></button>
                            </ResultList>
                        )
                      })  
                    }
                  </div>


                </Body>

            </div>
        )
    }
}

let mapStateToProps = state => {
  let { data: user } = state.user
  return {
      id: state.meals.currentMeal.meal_id,
      date: state.meals.currentMeal.date_created,
      number: state.meals.currentMeal.meal_number,
      results: state.meals.results,
      user
  }
}

const mapdispatchToProps =  { setCurrentFood, setFoodSearch, clearCurrentMeal }

export default connect(mapStateToProps, mapdispatchToProps)(AddFoodForm)