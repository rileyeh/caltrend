import React, { Component } from 'react'
import axios from 'axios'

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
        console.log(434343, resultsList)
        this.setState({
          resultsList
        })
        console.log(9393, this.state.resultsList)
      }

      add = async (ndbno) => {
        const res = await axios.get(`https://api.nal.usda.gov/ndb/V2/reports?ndbno=${ndbno}&type=b&format=json&api_key=ypLihhr1bxOT6RSZHDLPLbxzMVleTd0VaWKV9a8h`)
        const food = res.data.foods[0]
        console.log(23232323232, food)

        let { meal_id } = this.props
        axios.post('/api/food', { meal_id }).then(res => {
          return console.log('food added')
        })

        let newFoodList = []
        newFoodList.push(food)
        this.setState({
          foodList: [newFoodList]
        })
        console.log(56565, this.state.foodList[0])
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
          console.log(12345, item)
          return (
            <div key={i}>
              <p>{item[0].food.desc.name}</p>
              <p>calories: {item[0].food.nutrients[0].value}</p>
              <p>protein: {item[0].food.nutrients[1].value}</p>
              <p>fat: {item[0].food.nutrients[2].value}</p>
              <p>carbohydrates: {item[0].food.nutrients[3].value}</p>
              <p>fiber: {item[0].food.nutrients[4].value}</p>
              <p>sugar: {item[0].food.nutrients[5].value}</p>
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

export default AddFoodForm

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