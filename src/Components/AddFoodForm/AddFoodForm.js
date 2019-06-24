import React, { Component } from 'react'
import axios from 'axios'

class AddFoodForm extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            food: '',
            resultsList: [] 
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
    
      handleSearchSubmit = () => {
        this.search(this.state.food)
      }

    render() {
        let mappedResults = this.state.resultsList.map((food, i) => {
            return (
              <div key={i}>
                    <p>{food.name}</p>
                    <button>+</button>
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

                {mappedResults}
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