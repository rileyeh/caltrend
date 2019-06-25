import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

class AddFoodForm extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            food: '',
            resultsList: [],
            foodList: []
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

      add = async (ndbno) => {
        const res = await axios.get(`https://api.nal.usda.gov/ndb/V2/reports?ndbno=${ndbno}&type=b&format=json&api_key=ypLihhr1bxOT6RSZHDLPLbxzMVleTd0VaWKV9a8h`)
        const food = res.data.foods[0]
        console.log('HERE IS THE FOOD OBJECT WE ARE ADDING', res.data.foods)
        this.setState(prevState => ({
          foodList: [...prevState.foodList, { 'food': food }]
        }))
        let food_name = food.food.desc.name
        let calories = +food.food.nutrients[0].value
        let protein = +food.food.nutrients[1].value
        let fat = +food.food.nutrients[2].value
        let carbs = +food.food.nutrients[3].value
        let fiber = +food.food.nutrients[4].value
        let sugar = +food.food.nutrients[5].value
        console.log('THE REDUX MEAL ID COMING TO THE FOOD FORM', this.props)
        let meal_id = +this.props.meal_id.meal_id
        // i think we are going to have to get all these req.body keys from state
        axios.post('/api/newFood', {
          food_name, 
          calories, 
          carbs, 
          protein, 
          fat, 
          fiber, 
          sugar, 
          meal_id
        })
        .then(res => {
          console.log('did something hopefully')
        })
      }
 
    
      handleSearchSubmit = () => {
        this.search(this.state.food)
        this.setState({
          food: ''
        })
      }

      handleAddFood = (ndbno) => {
        this.add(ndbno)
      }

    render() {
        let mappedResults = this.state.resultsList.map((food, i) => {
            return (
              <div key={i}>
                    <p>{food.name}</p>
                    <button onClick={() => this.handleAddFood(food.ndbno)}>+</button>
                </div>
            )
          })  

        let mappedFood = this.state.foodList.map((item, i) => {
          return (
            <div key={i}>
              <p>{item.food.food.desc.name}</p>
              <p>calories: {item.food.food.nutrients[0].value}</p>
              <p>protein: {item.food.food.nutrients[1].value}</p>
              <p>fat: {item.food.food.nutrients[2].value}</p>
              <p>carbohydrates: {item.food.food.nutrients[3].value}</p>
              <p>fiber: {item.food.food.nutrients[4].value}</p>
              <p>sugar: {item.food.food.nutrients[5].value}</p>
            </div>
          )
        })
        
        return (
            <div style={styles.body}>
              <div style={styles.searchBar}>
                  <input 
                    onChange={e => this.handleChange(e)}
                    name='food'
                    type='text'
                    value={this.state.food} />
                  <button onClick={this.handleSearchSubmit}>search</button>
                </div>

                <div>
                  <h4>your food:</h4>
                  {mappedFood}
                </div>

                <div>
                  <h4>search results:</h4>
                  {mappedResults}
                </div>
            </div>
        )
    }
}

let mapStateToProps = state => {
  console.log('LOOK ITS THE REDUX STATE FROM THE FOOD FORM', state.meals.meal_id)
  return {
      meal_id: state.meals
  }
}

export default connect(mapStateToProps)(AddFoodForm)

let styles = {
  body: {
      width: '100%',
      border: '1px solid blue'
  },
  searchBar: {
    display: 'flex',
    justifyContent: 'space-evenly'
  }
}