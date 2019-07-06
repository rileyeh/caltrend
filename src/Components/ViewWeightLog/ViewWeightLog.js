import React, { Component } from 'react'
import Nav from '../Nav/Nav'
import axios from 'axios'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setCurrentWeight } from '../../ducks/reducers/weight'

class ViewWeightLog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            weights: [],
            rerender: false
        }
    }

    componentDidMount() {
        axios.get('/api/weight').then(res => {
            console.log('getting weight logs', res)
            this.setState({
                weights: res.data,
                rerender: true
            })
        })
    }

    deleteLog = async id => {
        axios.delete(`/api/weight/${id}`).then(res => {
            this.setState({
                weights: res.data
            })
        })
    }

    render() {
        return (
            <div>
                <Nav />
                <Body>
                    <Title>Weight Log</Title>
                    <StyledLink to='/addweight'>Log New Weight</StyledLink>
                    <CardHolder>
                    {this.state.rerender &&
                        this.state.weights.map((weight, i) => {
                            console.log('what the weights look like', weight)
                            return (
                                    <WeightCard key={i}>
                                        {weight.date_created}
                                        <br />
                                        {weight.pounds} pounds
                                        <label>&hellip;</label>
                                        <Buttons>
                                            <button><Link onClick={() => this.props.setCurrentWeight(weight)} to='/editweight'>edit</Link></button>
                                            <button onClick={() => this.deleteLog(weight.weight_id)}>delete</button>
                                        </Buttons>
                                    </WeightCard>
                            )
                        })
                    }
                    </CardHolder>
                </Body>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        state
    }
}

export default connect(mapStateToProps, { setCurrentWeight })(ViewWeightLog)

// let darkGreen = '#219653'
// let mediumGreen = '#2DB969'
let greenBlue ='#28b485'
let darkAccent = '#5C5C5C'
let lightAccent = '#F8F8F8'
let shadow = '#a3a3a3'

const Body = styled.div`
    background: linear-gradient(to right bottom, ${darkAccent}, ${shadow});
    min-height: 90vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Title = styled.h3`
    color: ${lightAccent};
    font-size: 24px;
    text-align: center;
    padding-top: 10px;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    width: 150px;
    height: 25px;
    background: ${greenBlue};
    color: ${lightAccent};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    margin-top: 10px;

    &:hover {
        background: ${lightAccent};
        color: ${darkAccent};
    }
`

const CardHolder = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const WeightCard = styled.div`
    width: 40vw;
    height: 35vw;
    border-bottom: 1px solid rgba(255, 255, 255, .3);
    font-size: 18px;
    padding: 0 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: ${lightAccent};
    position: relative;

    > label {
        position: absolute;
        bottom: 4px;
        right: 4px;
        font-size: 24px;
        color: rgba(255, 255, 255, .5);
    }
`
//  technically, this hover stuff is for desktop, not mobile. so. gotta change that up in the media queries.
const Buttons = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;

    > button {
        display: none;
        text-align: center;
    }
    
    &:hover {
        background: rgba(255, 255, 255, .8);
        display: flex;
        align-items: center;
        justify-content: space-evenly;

        > button {
            display: flex;
            background: ${greenBlue};
            width: 40px;
            height: 20px;
            border-radius: 4px;
            color: ${lightAccent};

            :hover {
                background: ${darkAccent};
            }

            :active {
                background: ${lightAccent};
                color: ${darkAccent};
            }
        }
    }
`
