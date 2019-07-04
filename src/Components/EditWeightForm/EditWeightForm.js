import React, { Component } from 'react'
import Nav from '../Nav/Nav'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
 

class EditWeightForm extends Component {
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
        // gotta change this to an axios update
        let {pounds, date} = this.state
        let date_created = date.toDateString()
        let exact_date = date
        axios.post('/api/weight', {pounds, date_created, exact_date}).then(res => {
            this.setState({
                redirect: true
            })
        }).catch(err => console.log('error adding weight log', err))
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/weightlog' />
        }
        return (
            <div>
                <Nav />
                <h4>Edit Weight Log</h4>
                <StyledDatePicker 
                    selected={this.state.date}
                    onChange={this.handleDateChange}
                    value={this.props.edate}
                />
                <Input 
                    name='pounds'
                    placeholder='enter weight here'
                    value={this.state.pounds}
                    onChange={this.handleChange}
                />
                <button onClick={this.handleSubmit}>update</button>

            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('state by the time were editing', state)
    return {
        date: state.weight.currentWeight.date_created
    }
}

export default connect(mapStateToProps)(EditWeightForm)

// let darkGreen = '#219653'
// let mediumGreen = '#2DB969'
let greenBlue ='#28b485'
let darkAccent = '#333333'
let lightAccent = '#F4F4F4'
// let shadow = '#a3a3a3'

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
    background: ${lightAccent}
    width: 60vw;
    padding-top: 30px;
`