import React, { Component } from 'react'
import Chart from 'chart.js'
import axios from 'axios'

class CaloriesChart extends Component {
    chartRef = React.createRef()

    // so, we'll need a function, an axios call, that will go get meals by the date, and get food by meal. we'll map over the foods to get the calories(later we can do more nutrients). then the line chart will show dates on the x axis with calories on the y axis. this means that we'll need two arrays. an array of the dates. and an array of the calories added up. the calories will be similar to how i have food log working right now. to get the dates, i think that i can use some fancy stuff with the date object to get the last thirty days from the current day. and use .toDateString() so that everything matches.

    // thinking i'll need to create a day view in the logs. then i'll do a similar thing over here.

    componentDidMount() {
        // let date =  'July 2nd'
        // axios.get(`/api/meals/${date}`)


        const myChartRef = this.chartRef.current.getContext('2d')

        new Chart(myChartRef, {
            type: 'line',
            data: {
                labels: ['May 29th', 'May 30th', 'May 31st', 'June 1st', 'June 2nd'],
                datasets: [
                    {
                        label: 'calories',
                        data: [2560, 2300, 2750, 2480, 3000]
                    },
                    {
                        label: 'weight',
                        data: [170, 172, 168, 170, 171]
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
                <canvas id='myChart' ref={this.chartRef} />
            </div>
        )
    }
}

export default CaloriesChart