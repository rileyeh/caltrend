import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { writeMealInfo } from '../../ducks/reducers/meals'
import { Link } from 'react-router-dom'


class AddMealForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            date: '',
            meal: '',
            foodForm: false,
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
            let date = res.data[0].date_created
            let number = res.data[0].meal_number

            let obj = {
                id,
                date,
                number
            }

            this.props.writeMealInfo(obj)
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
                
                <Link to='foodsform'><button onClick={this.handleSubmit}>add foods</button></Link>
                
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

export default connect(mapStateToProps, { writeMealInfo })(AddMealForm)

// export default AddMealForm



let styles = {
    body: {
        width: '40vw',
        border: '1px solid red',
        display: 'flex',
        flexDirection: 'column'
    }
}