import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { setCurrentFood, setFoodSearch, clearCurrentMeal } from '../../ducks/reducers/meals'
import { Link, Redirect } from 'react-router-dom'
import Nav from '../Nav/Nav'
import styled from 'styled-components'

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

    handleChange = e => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    search = async (val) => {
        const res = await axios.get(`https://api.nal.usda.gov/ndb/search/?format=json&q=${val}&max=25&sort=n&api_key=ypLihhr1bxOT6RSZHDLPLbxzMVleTd0VaWKV9a8h`)
        const initialList = res.data.list.item
        let resultsList = []
        initialList.map(item => {
          console.log('whats the type', item, typeof item)
          console.log('whats the name', item.name)
          let name = item.name.slice(0, -19).replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()})
          console.log('the sliced name', name)
          resultsList.push(name)
        })
        console.log('before we set the results', this.state.resultsList)
        this.setState({
          resultsList: initialList
        })
        console.log('after we set the results', this.state.resultsList)

        this.props.setFoodSearch(initialList)
      }

    addToState = async (ndbno) => {
      const res = await axios.get(`https://api.nal.usda.gov/ndb/V2/reports?ndbno=${ndbno}&type=b&format=json&api_key=ypLihhr1bxOT6RSZHDLPLbxzMVleTd0VaWKV9a8h`)
      const result = res.data.foods[0]
      console.log(555, result)

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

    componentDidMount() {
      if(this.props.id) {
      let id = this.props.id
      console.log('the date from props',this.props.date, typeof this.props.date)
       axios.get(`/api/meal/${id}`).then(res => {
        let currentMeal = res.data[0]
        axios.post('/api/food', currentMeal).then(res => {
          this.setState({
            foodList: res.data,
            resultsList: this.props.results,
          })
        })
      }).catch(err => console.log('error in the food log', err))
    }
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
                            <h4>{food.food_name}</h4>
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
                      <ButtonLink onClick={() => this.props.clearCurrentMeal} to='/foodlog'>done</ButtonLink>
                    </Search>            
                
                  <div>
                    {this.state.resultsList.length !== 0 &&
                       this.state.resultsList.map((food, i) => {
                      console.log('state in the render', this.state.resultsList)
                      let {name} = food
                      name = name.slice(0, -19).replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()})

                        return (
                          <List key={i} onClick={() => this.handleAddFood(food.ndbno)}>
                                <p>{name}</p>
                                <button>></button>
                            </List>
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
  console.log('LOOK ITS THE REDUX STATE FROM THE FOOD FORM', state)
  return {
      id: state.meals.currentMeal.meal_id,
      date: state.meals.currentMeal.date_created,
      number: state.meals.currentMeal.meal_number,
      results: state.meals.results
  }
}

export default connect(mapStateToProps, { setCurrentFood, setFoodSearch, clearCurrentMeal })(AddFoodForm)

// let darkGreen = '#219653'
let mediumGreen = '#2DB969'
let greenBlue ='#28b485'
let darkAccent = '#5C5C5C'
let lightAccent = '#F8F8F8'
// let shadow = '#a3a3a3'

const Body = styled.div`
  background: ${lightAccent}
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MealTitle = styled.h1`
  color: ${greenBlue};
  font-weight: bold;
  font-size: 30px;
  padding: 20px 0;
`

const ButtonLink = styled(Link)`
  background: ${greenBlue}
  border: none;
  width: 75px;
  height: 40px;
  border-radius: 8px;
  color: ${lightAccent};
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Button = styled.button`
  background: ${greenBlue}
  border: none;
  width: 75px;
  height: 40px;
  border-radius: 8px;
  color: ${lightAccent};
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`

const Search = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100vw;
  padding-bottom: 10px;
`
const SearchBar = styled.input`
  border: none;
  border-radius: 0px;
  border-bottom: 1px solid ${darkAccent};
  width: 40%;
  background: ${lightAccent};
`

const List = styled.div`
  background: ${lightAccent};
  display: flex;
  align-items: center;
  margin: 0 15px;
  padding: 0 10px;
  justify-content: space-evenly;
  text-align: center;
  border-bottom: 1px solid ${mediumGreen};
  width: 90vw;
  padding: 5px 0;
  margin-bottom: 5px;
  color: ${darkAccent}

  > h4 {
    font-size: 14px;
  }

  > p {
    color: ${darkAccent};
  }

  > button {
    background: none;
    border: none;
    color: ${greenBlue};
    font-size: 20px;
  }
`