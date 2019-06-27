import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { setCurrentFood } from '../../ducks/reducers/meals'
import { Link, Redirect } from 'react-router-dom'

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
        const resultsList = res.data.list.item
        this.setState({
          resultsList
        })
      }

    addToState = async (ndbno) => {
      const res = await axios.get(`https://api.nal.usda.gov/ndb/V2/reports?ndbno=${ndbno}&type=b&format=json&api_key=ypLihhr1bxOT6RSZHDLPLbxzMVleTd0VaWKV9a8h`)
      const result = res.data.foods[0]
      console.log(555, result)

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
      
      let food = {
        name, 
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

      console.log(88888, this.state)


    }

    componentDidMount() {
      let id = this.props.id
      console.log(33333, id)
       axios.get(`/api/meal/${id}`).then(res => {
        let currentMeal = res.data[0]
        console.log(44444, res, 55555, currentMeal)
        axios.post('/api/food', currentMeal).then(res => {
          console.log(7777, res.data)
          this.setState({
            foodList: res.data
          })
        })
      }).catch(err => console.log('error in the food log', err))
      console.log(9999, this.state)
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
        let mappedResults = this.state.resultsList.map((food, i) => {
            return (
              <div key={i}>
                    <p>{food.name}</p>
                    <button onClick={() => this.handleAddFood(food.ndbno)}>></button>
                </div>
            )
          })  

       
        let currentFoodInfo=this.state.currentFood.food.nutrients.filter(item => {
          return item.nutrient_id < 300
        }).map((item, i) => {
          console.log('THIS IS THE ITEM FROM NUTRIENTS', item)
          return (
            <div key={i}>
              <p>{item.name}: {item.value}</p>
            </div>
          )
        })
      

        
        return (

            <div style={styles.body}>

                <h3>{this.props.date} Meal {this.props.number}</h3>
                <Link to='/foodlog'>done</Link>

                <div>
                  <div>
                    {this.state.foodList !== 0 && 

                    this.state.foodList.map((food, i) => {
                        return (
                        <div key={i} style={styles.mealBox}>
                          <h4>{food.food_name}</h4>
                          <p>{food.calories} calories</p>
                        </div>
                      )
                    }
                    )}
                  </div>

                  < div style={styles.searchBar}>
                    <input 
                      onChange={e => this.handleChange(e)}
                      name='food'
                      type='text'
                      value={this.state.food} />
                    <button onClick={this.handleSearchSubmit}>search</button>
                  </div>
                </div>             
              
                <div>{mappedResults}</div>

            </div>
        )
    }
}

let mapStateToProps = state => {
  console.log('LOOK ITS THE REDUX STATE FROM THE FOOD FORM', state)
  return {
      id: state.meals.data.id,
      date: state.meals.data.date,
      number: state.meals.data.number
  }
}

export default connect(mapStateToProps, { setCurrentFood })(AddFoodForm)

let styles = {
  body: {
      width: '100%',
      border: '1px solid blue'
  },
  searchBar: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  mealBox: {
    border: '1px solid green'
  }
}