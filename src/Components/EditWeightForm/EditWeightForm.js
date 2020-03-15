import React, { Component } from 'react'
import Nav from '../Nav/Nav'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Body, Title, Input, StyledDatePicker, Button, ButtonsContainer } from './styles'
 

class EditWeightForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pounds: 0,
            date: new Date(),
            redirect: false
        }
    }

    componentDidMount() {
        let {pounds, date} = this.props
        date = new Date(date)
        this.setState({
            pounds,
            date
        })
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
        if (this.state.date === this.props.date) {
            let { id, date: date_created, edate: exact_date } = this.props
            let { pounds } = this.state
            axios.put(`/api/weight/${id}`, { pounds, date_created, exact_date }).then(res => {
                this.setState({
                    redirect: true
                })
            }).catch(err => console.log('error editing weight log', err))
        } else {
            let {id} = this.props
            let {pounds, date} = this.state
            let date_created = date.toDateString()
            let exact_date = date
            axios.put(`/api/weight/${id}`, {pounds, date_created, exact_date}).then(res => {
                this.setState({
                    redirect: true
                })
            }).catch(err => console.log('error editing weight log', err))
        }
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

                    <Title>Edit Weight Log</Title>

                    <StyledDatePicker 
                        selected={this.state.date}
                        onChange={this.handleDateChange}
                        // value={this.state.date}
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
        date: state.weight.currentWeight.date_created,
        edate: state.weight.currentWeight.exact_date,
        pounds: state.weight.currentWeight.pounds,
        id: state.weight.currentWeight.weight_id,
        user
    }
}

export default connect(mapStateToProps)(EditWeightForm)