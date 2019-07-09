import React, { Component } from 'react'
import Nav from '../Nav/Nav'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
 

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

let darkAccent = '#5C5C5C'
let whiteAccent = '#F8F8F8'
// let lightBlue = '#50B6BB'
// let mediumBlue = '#4BA9AD'
let darkBlue = '#45969B'
// let orange = '#FF6830'

const Body = styled.div`
    background: ${whiteAccent};
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;

    @media(min-width: 500px) {
        width: 90vw;
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
`

const StyledDatePicker = styled(DatePicker)`
    margin: 0 auto;
    color: ${darkAccent};
    border: none;
    border-bottom: 1px solid ${darkAccent};
    border-radius: 0;
    background: ${whiteAccent};
    width: 60vw;
    padding-top: 30px;
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