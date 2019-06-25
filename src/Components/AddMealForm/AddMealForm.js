import React, { Component } from 'react'
import AddFoodForm from '../AddFoodForm/AddFoodForm'
import axios from 'axios'
import { connect } from 'react-redux'
import { writeMealId } from '../../ducks/reducers/meals'
import { Link } from 'react-router-dom'


class AddMealForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            date: '',
            meal: '',
            foodForm: false,
            showDone: false
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

            let id = res.data[0].meal_id

            this.props.writeMealId(id)
            // this.props.history.push('/')

            this.setState({
                foodForm: true,
                showDone: true
            })
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

                    {this.state.showDone 
                        ? 
                        <button><Link to='/foodlog'>done</Link></button>
                        :
                        <button onClick={this.handleSubmit}>add foods</button>}
                
                {this.state.foodForm && <AddFoodForm />}
            </div>
        )
    }
}

let mapStateToProps = state => {
    console.log('LOOK ITS THE REDUX STATE', state.meals.meal_id)
    return {
        meal_id: state.meals
    }
}

export default connect(mapStateToProps, { writeMealId })(AddMealForm)

// export default AddMealForm



let styles = {
    body: {
        width: '40vw',
        border: '1px solid red',
        display: 'flex',
        flexDirection: 'column'
    }
}