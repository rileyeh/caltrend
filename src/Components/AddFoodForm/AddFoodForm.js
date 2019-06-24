import React, { Component } from 'react'
import axios from 'axios'

class AddFoodForm extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            food: '',
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
        const foodList = res.data.list.item
        this.setState({
          foodList: [foodList]
        })
        console.log(9393, this.state.foodList)
      }
    
      handleSearchSubmit = () => {
        this.search(this.state.food)
      }

    render() {
        let mappedFoods = this.state.foodList.map((food, i) => {
            console.log(6767676, food)
            return (
              <div key={i}>
                    <p>{food.name}</p>
                </div>
            )
          })            

        return (
            <div>
                <input 
                  onChange={e => this.handleChange(e)}
                  name='food'
                  type='text'
                  value={this.state.food} />
                <button onClick={this.handleSearchSubmit}>search</button>
                {mappedFoods}
            </div>
        )
    }
}

export default AddFoodForm