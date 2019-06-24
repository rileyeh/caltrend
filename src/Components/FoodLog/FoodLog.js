import React, { Component } from 'react'
import axios from 'axios'

class FoodLog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            foods: []
        }
    }

    componentDidMount() {
        axios.get('/api/meals').then(res =>
            console.log(456456, res))
    }

    render() {
        return (
            <div>
                FoodLog
            </div>
        )
    }
}

export default FoodLog