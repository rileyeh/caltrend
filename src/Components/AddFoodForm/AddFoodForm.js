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

export default connect(mapStateToProps, { setCurrentFood, setFoodSearch, clearCurrentMeal })(AddFoodForm)

let shadow = '#787878'
// let mediumShadow = '#636363'
let darkAccent = '#5C5C5C'
let whiteAccent = '#F8F8F8'
// let lightBlue = '#50B6BB'
let mediumBlue = '#4BA9AD'
// let darkBlue = '#45969B'
let red = '#FF5757'

const Body = styled.div`
  background: ${whiteAccent}
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media(min-width: 500px) {
    margin-left: 120px;
    align-items: flex-start;
  }

  @media(min-width: 1000px) {
    margin-left: 160px;
  }
`

const MealTitle = styled.h1`
  color: ${mediumBlue};
  font-weight: bold;
  font-size: 30px;
  padding: 20px 0;

  @media(min-width: 500px) {
    margin-left: 40px;
  }
`

const ButtonLink = styled(Link)`
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

  :hover {
    background: ${red};
  }
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

  :hover {
    background: ${red};
  }

  @media(min-width: 500px) {
    margin: 0 20px;
  }
`

const Search = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100vw;
  padding-bottom: 10px;

  @media(min-width: 500px) {
    width: 60vw;
    margin-left: 40px;
    justify-content: flex-start;
  }
`
const SearchBar = styled.input`
  border: none;
  border-radius: 0px;
  border-bottom: 1px solid ${darkAccent};
  width: 40%;
  background: ${whiteAccent};
`

const List = styled.div`
  background: ${whiteAccent};
  display: flex;
  align-items: center;
  margin: 0 15px;
  padding: 0 10px;
  justify-content: space-evenly;
  text-align: center;
  border-bottom: 1px solid ${red};
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
    color: ${mediumBlue};
    font-size: 20px;
  }

  @media(min-width: 500px) {
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 60vw;
    margin-left: 40px;

    > button {
      margin-left: 10px;
    }
  }
`

const ResultList = styled.div`
background: ${whiteAccent};
display: flex;
align-items: center;
margin: 0 15px;
padding: 0 10px;
justify-content: space-evenly;
text-align: center;
border-bottom: 1px solid ${red};
width: 90vw;
padding: 5px 0;
margin-bottom: 5px;
color: ${darkAccent};


:hover {
  background: rgba(92, 92, 92, .3);
}

> h4 {
  font-size: 14px;
}

> p {
  color: ${darkAccent};
}

> button {
  background: none;
  border: none;
  color: ${mediumBlue};
  font-size: 20px;
}

@media(min-width: 500px) {
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 60vw;
  margin-left: 40px;

  > button {
    margin-left: 10px;
  }
}
`