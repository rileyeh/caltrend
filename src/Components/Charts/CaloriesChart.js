import React, { Component } from 'react'
import Chart from 'chart.js'
import axios from 'axios'
import { mediumBlue, red } from '../../colors'

Chart.defaults.global.defaultFontFamily = "'Raleway', sans-serif"


class CaloriesChart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dates: [],
            meals: [],
            calories: [],
            weightLogs: [],
            weights: []
        }
    }

    chartRef = React.createRef()

    componentDidMount = async () => {

        const myChartRef = this.chartRef.current.getContext('2d')


        await axios.get('/api/mealsbydate').then(res => {
            let dates = res.data.map(meal => {
                return meal.exact_date
            })

            dates = Array.from(new Set(dates.sort().map(date => new Date(date).toDateString())))

            this.setState({
                dates,
                meals: res.data
            })
        }).catch(err => console.log('error in the calories chart', err))

        await axios.get('/api/weight').then(res => {
            this.setState({
                weightLogs: res.data
            })
        }).catch(err => console.log('error in the calories chart', err))

        let {dates, meals, weightLogs} = this.state

        let calories = dates.map(date => {
            return meals.reduce((acc, meal) => {
                return (date === meal.date_created) ? acc + +meal.calories : acc
            }, 0)
        })

        let weights = dates.map(date => {
            return weightLogs.reduce((acc, log) => {
                return (date === log.date_created) ? acc + +log.pounds : acc
            }, 0)
        })

        this.setState({
            calories,
            weights
        })

        new Chart(myChartRef, {
            type: 'line',
            data: {
                labels: this.state.dates,
                datasets: [
                    {
                        label: 'calories',
                        data: this.state.calories,
                        borderColor: red,
                        fill: false
                    },
                    {
                        label: 'weight',
                        data: this.state.weights,
                        borderColor: mediumBlue,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }

        })
    }

    render() {
        return(
            <div>
                <canvas id='myChart' ref={this.chartRef} style={{'display': 'block', 'minHeight': 325, 'maxWidth': '75vw'}}/>
            </div>
        )
    }
}

export default CaloriesChart
