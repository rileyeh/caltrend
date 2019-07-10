import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { setCurrentMeal, clearCurrentMeal } from '../../ducks/reducers/meals'
import { Link, Redirect, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Nav from '../Nav/Nav'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


class AddMealForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            date: new Date(),
            meal: '',
            edit: false,
            redirect: false
        }
    }

    componentDidMount() {
        if(this.props.meal.date_created) {
            let date = new Date(this.props.meal.date_created)
            this.setState({
                date,
                meal: this.props.meal.meal_number,
                edit: true
            })
        }

        if(this.props.meal.date) {
            let date = new Date(this.props.meal.date)
            this.setState({
                date
            })
        }
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleDateChange = date => {
        this.setState({
            date
        }) 
    }

    handleSubmit = () => {
        let { date, meal } = this.state
        let date_created = date.toDateString()
        let exact_date = date
        axios.post('/api/meals', { date_created, meal, exact_date }).then(res => {
            let meal_id = +res.data[0].meal_id
            let date_created = res.data[0].date_created
            let meal_number = +res.data[0].meal_number

            let obj = {
                meal_id,
                date_created,
                meal_number
            }
            this.props.clearCurrentMeal()
            this.props.setCurrentMeal(obj)
            // this.props.history.push('/')
            this.setState({
                redirect: true
            })

        }).catch(err => console.log('error in add meal form', err))
    }

    updateMeal = id => {
        let {date, meal} = this.state
        axios.put(`/api/meal/${id}`, { date, meal }).then(res => {
        }).catch(err => console.log('error in add meal form', err))
    }

    handleCancel = () => {
        this.props.clearCurrentMeal()
        this.props.history.push('/foodlog')
    }

    render() { 
        if (!this.props.user) {
            return <Redirect to='/' />
          }     
        if (this.state.redirect) {
            return <Redirect to='foodsform' />
        }  
        return (
            <Page>
            <Nav />                
            <Body>
                <Title>add meal</Title>
                <StyledDatePicker 
                    selected={this.state.date}
                    onChange={this.handleDateChange}
                />
                <Input
                    name='meal'
                    type='text'
                    value={this.state.meal}
                    placeholder= 'meal'
                    onChange={this.handleChange}/>

                <ButtonsContainer>
                    <Button onClick={this.handleCancel}>cancel</Button>
                    {this.state.edit ? 
                        <ButtonLink onClick={() => this.updateMeal(this.props.meal.meal_id)} to='/foodlog'>update</ButtonLink>
                        :
                        <div>
                            <Button onClick={this.handleSubmit}>add foods</Button>
                        </div>
                }
                </ButtonsContainer>
            </Body>
            </Page>
        )
    }
}

let mapStateToProps = state => {
  let { data: user } = state.user
    return {
        meal: state.meals.currentMeal,
        user
    }
}

export default withRouter(connect(mapStateToProps, { setCurrentMeal, clearCurrentMeal })(AddMealForm))

let darkAccent = '#5C5C5C'
let whiteAccent = '#F8F8F8'
// let lightBlue = '#50B6BB'
// let mediumBlue = '#4BA9AD'
let darkBlue = '#45969B'
// let red = '#FF5757'

const Page = styled.div`
    @media(min-width: 500px) {
        display: flex;
    }
`

const Body = styled.div`
    background: ${whiteAccent};
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;

    @media(min-width: 500px) {
        margin-left: 120px;
    }

    @media(min-width: 1000px) {
        margin-left: 160px;
    }
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
    width: 60vw;
    padding-top: 30px;

    @media(min-width: 500px) {
        font-size: 22px;
    }
`
const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 80%;
    padding-top: 30px;
`

const Button = styled.button`
    background: ${darkBlue}
    border: none;
    width: 95px;
    height: 40px;
    border-radius: 8px;
    color: ${whiteAccent};
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
        background: ${darkAccent}
    }
`

const ButtonLink = styled(Link)`
    background: ${darkBlue}
    border: none;
    width: 95px;
    height: 40px;
    border-radius: 8px;
    color: ${whiteAccent};
    text-decoration: none;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
        background: ${darkAccent}
    }
`
const StyledDatePicker = styled(DatePicker)`
    margin: 0 auto;
    color: ${darkAccent};
    border: none;
    border-bottom: 1px solid ${darkAccent};
    border-radius: 0;
    background: ${whiteAccent}
    width: 60vw;
    padding-top: 30px;

    @media(min-width: 500px) {
        font-size: 22px;
    }
`