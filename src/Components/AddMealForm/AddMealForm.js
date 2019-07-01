import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { writeMealInfo } from '../../ducks/reducers/meals'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Nav from '../Nav/Nav'


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
            <div>
            <Nav />
            <Body>
                
                <Title>add meal</Title>
                <Input
                    name='date'
                    type='text'
                    placeholder='date'
                    onChange={this.handleChange}/>
                <Input
                    name='meal'
                    type='text'
                    placeholder='meal'
                    onChange={this.handleChange}/>

                <ButtonsContainer>
                    <ButtonLink to='dashboard'>cancel</ButtonLink>
                    <ButtonLink to='foodsform' onClick={this.handleSubmit}>add foods</ButtonLink>
                </ButtonsContainer>
            </Body>
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