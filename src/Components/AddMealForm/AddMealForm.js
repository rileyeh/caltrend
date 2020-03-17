import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { setCurrentMeal, clearCurrentMeal } from '../../redux/reducers/meals'
import { Redirect, withRouter } from 'react-router-dom'
import Nav from '../Nav/Nav'
import { Page, Body, Title, Input, ButtonsContainer, Button, ButtonLink, StyledDatePicker } from './styles'


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