import React, { Component } from 'react'
import Nav from '../Nav/Nav'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Body, Title, Input, Button, ButtonsContainer, StyledDatePicker } from './styles'


class AddWeightLog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pounds: 0,
            date: new Date(),
            redirect: false
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
        let {pounds, date} = this.state
        let date_created = date.toDateString()
        let exact_date = date
        axios.post('/api/weight', {pounds, date_created, exact_date}).then(res => {
            this.setState({
                redirect: true
            })
        }).catch(err => console.log('error adding weight log', err))
    }

    handleCancel = () => {
        this.props.history.push('/weightlog')
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/weightlog' />
        }
        if (!this.props.user) {
            return <Redirect to='/' />
          }
        return (
            <div>
                <Nav />
                <Body>
                    <Title>Add Weight Log</Title>
                    <StyledDatePicker 
                        selected={this.state.date}
                        onChange={this.handleDateChange}
                    />
                    <Input 
                        name='pounds'
                        placeholder='enter weight here'
                        value={this.state.pounds}
                        onChange={this.handleChange}
                    />
                <ButtonsContainer>
                    <Button onClick={this.handleCancel}>cancel</Button>
                    <Button onClick={this.handleSubmit}>submit</Button>
                </ButtonsContainer>
                </Body>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let { data: user } = state.user
    return {
        user
    }
}

export default connect(mapStateToProps)(AddWeightLog)
