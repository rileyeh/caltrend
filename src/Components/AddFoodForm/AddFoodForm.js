import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

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
            edit: false,
            search: false
        }
    }

    componentDidUpdate() {
      console.log(2143542, this.state.currentFood)
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
      const food = res.data.foods[0]
      console.log(555, food)
      this.setState(prevState => ({
        currentFood: food,
        foodList: [...prevState.foodList, { 'food': food }],
        resultsList: [],
        edit: true,
        search: false
      })
      )}


      addToDatabase = () => {
        console.log(6666, this.state.foodList)

        let food_name = this.state.foodList[0].food.food.desc.name
        let calories = +this.state.foodList[0].food.food.nutrients[0].value
        let protein = +this.state.foodList[0].food.food.nutrients[1].value
        let fat = +this.state.foodList[0].food.food.nutrients[2].value
        let carbs = +this.state.foodList[0].food.food.nutrients[3].value
        let fiber = +this.state.foodList[0].food.food.nutrients[4].value
        let sugar = +this.state.foodList[0].food.food.nutrients[5].value
        let quantity = 20
        let unit = 'g'
        let meal_id = +this.props.meal_id
  
  
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

        this.toggleEdit()
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

    toggleEdit = () => {
      let { edit } = this.state 
      this.setState({
        edit: !edit
      })
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
              <p>{item.food.food.desc.name}<span><button onClick={this.toggleDropDown}>^</button></span></p>
              {this.state.dropDown &&
              <div>
              <p>{item.food.food.nutrients[0].measures[0].eqv}{item.food.food.nutrients[0].measures[0].eunit}</p>
              <p>calories: {item.food.food.nutrients[0].value}</p>
              <p>protein: {item.food.food.nutrients[1].value}</p>
              <p>fat: {item.food.food.nutrients[2].value}</p>
              <p>carbohydrates: {item.food.food.nutrients[3].value}</p>
              <p>fiber: {item.food.food.nutrients[4].value}</p>
              <p>sugar: {item.food.food.nutrients[5].value}</p>
              </div>}
            </div>
          )
        })

        let currentFoodInfo =this.state.currentFood.food.nutrients.filter((item, i) => {
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
              <div style={styles.searchBar}>
                  <input 
                    onChange={e => this.handleChange(e)}
                    name='food'
                    type='text'
                    value={this.state.food} />
                  <button onClick={this.handleSearchSubmit}>search</button>
                </div>

                {this.state.edit
                ?
                <div>
                  {this.state.currentFood.food.desc.name}
                  {currentFoodInfo}
                  <button onClick={this.addToDatabase()}>add to meal</button>
                </div>
                :
                <div>
                  {mappedFood}
                </div>
              }

              {this.state.search && <div>{mappedResults}</div>}

            </div>
        )
    }
}

let mapStateToProps = state => {
  console.log('LOOK ITS THE REDUX STATE FROM THE FOOD FORM', state)
  return {
      meal_id: state.meals.meal_id
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