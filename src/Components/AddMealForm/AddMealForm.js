import React, { Component } from 'react'
import AddFoodForm from '../AddFoodForm/AddFoodForm'
import axios from 'axios'

class AddMealForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            date: '',
            meal: ''     
        }
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = () => {
        let { date, meal } = this.state
        axios.post('/api/meals', { date, meal }).then(res => {
            console.log(76547654, 'meal added')
            // this.props.history.push('/')
        })
    }

    render() {
        
        return (
            <div style={styles.body}>
                <h3>add meal</h3>
                <input
                    name='date'
                    type='text'
                    placeholder='date'
                    onChange={this.handleChange}/>
                <input
                    name='meal'
                    type='text'
                    placeholder='meal'
                    onChange={this.handleChange}/>
                <button onClick={this.handleSubmit}>submit</button>
                <AddFoodForm meal_id={this.meal}/>
            </div>
        )
    }
}

export default AddMealForm

let styles = {
    body: {
        width: '40vw',
        border: '1px solid red',
        display: 'flex',
        flexDirection: 'column'
    }
}