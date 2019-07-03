import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { setCurrentMeal, clearCurrentMeal } from '../../ducks/reducers/meals'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Nav from '../Nav/Nav'


class AddMealForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            date: '',
            meal: '',
            edit: false
        }
    }

    componentDidMount() {
    console.log('LOOK ITS THE PROPS FROM ADD MEAL FORM', this.props)
        console.log('the meal id', this.props.meal.meal_id)
        if(this.props.meal.meal_id) {
            this.setState({
                date: this.props.meal.date_created,
                meal: this.props.meal.meal_number,
                edit: true
            })
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
            console.log(999999, res)
            let meal_id = +res.data[0].meal_id
            let date_created = res.data[0].date_created
            let meal_number = +res.data[0].meal_number

            let obj = {
                meal_id,
                date_created,
                meal_number
            }
            console.log('the props on add meal form', this.props)
            this.props.setCurrentMeal(obj)
            // this.props.history.push('/')

        }).catch(err => console.log('error in add meal form', err))
    }

    updateMeal = id => {
        let {date, meal} = this.state
        axios.put(`/api/meal/${id}`, { date, meal }).then(res => {
            console.log('the response from updating', res)
        })
    }

    render() {
        
        return (
            <div>
            <Nav />
            <Body>
                
                <Title>add meal</Title>
                <Input
                    name='date'
                    type='text'
                    value={this.state.date}
                    placeholder= 'date'
                    onChange={this.handleChange}/>
                <Input
                    name='meal'
                    type='text'
                    value={this.state.meal}
                    placeholder= 'meal'
                    onChange={this.handleChange}/>

                <ButtonsContainer>
                    <ButtonLink onClick={this.props.clearCurrentMeal} to='dashboard'>cancel</ButtonLink>
                    {this.state.edit ? 
                        <ButtonLink onClick={() => this.updateMeal(this.props.meal.meal_id)} to='/foodlog'>update</ButtonLink>
                        :
                        <ButtonLink onClick={this.handleSubmit} to='foodsform'>add foods</ButtonLink>
                }
                </ButtonsContainer>
            </Body>
            </div>
        )
    }
}

let mapStateToProps = state => {
    console.log('THE REDUX STATE FROM ADD MEAL FORM', state)
    return {
        meal: state.meals.currentMeal
    }
}

export default connect(mapStateToProps, { setCurrentMeal, clearCurrentMeal })(AddMealForm)

// export default AddMealForm

// let darkGreen = '#219653'
// let mediumGreen = '#2DB969'
let greenBlue ='#28b485'
let darkAccent = '#333333'
let lightAccent = '#F4F4F4'
// let shadow = '#a3a3a3'

const Body = styled.div`
    background: ${lightAccent};
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
`

const Title = styled.h3`
    color: ${darkAccent};
    font-weight: bold;
    font-size: 30px;
    padding: 20px 0;

    @media(min-width: 500px) {
    margin-left: 60px;
    padding-top: 40px;
    }

    @media(min-width: 1000px) {
    padding-top: 60px;
    }
`

const Input = styled.input`
    border: none;
    border-bottom: 1px solid ${darkAccent};
    border-radius: 0;
    background: none;
    width: 60%;
    padding-top: 30px;
`
const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 80%;
    padding-top: 30px;
`

const ButtonLink = styled(Link)`
    background: ${greenBlue}
    border: none;
    width: 95px;
    height: 40px;
    border-radius: 8px;
    color: ${lightAccent};
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
`