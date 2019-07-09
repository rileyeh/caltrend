import React, { Component } from 'react'
import Nav from '../Nav/Nav'
import axios from 'axios'
import styled from 'styled-components'
import { Link, Redirect } from 'react-router-dom'
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
            this.setState({
                weights: res.data,
                rerender: true
            })
        }).catch(err => console.log('error in view weight log', err))
    }

    deleteLog = async id => {
        axios.delete(`/api/weight/${id}`).then(res => {
            this.setState({
                weights: res.data
            })
        }).catch(err => console.log('error in view weight log', err))
    }

    render() {
        if (!this.props.user) {
            return <Redirect to='/' />
          }
        return (
            <div>
                <Nav />
                <Body>
                    <TopSection>
                        <Title>Weight Log</Title>
                        <StyledLink to='/addweight'>+</StyledLink>
                    </TopSection>
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
                                            <button><Link onClick={() => this.props.setCurrentWeight(weight)} to='/editweight' style={{'textDecoration':'none', 'textAlign':'center', 'color':'#F8F8F8'}}>edit</Link></button>
                                            <button onClick={() => this.deleteLog(weight.weight_id)} style={{'textAlign':'center'}}>delete</button>
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
    let { data: user } = state.user
    return {
        user
    }
}

export default connect(mapStateToProps, { setCurrentWeight })(ViewWeightLog)

let shadow = '#787878'
let mediumShadow = '#636363'
let darkAccent = '#5C5C5C'
let whiteAccent = '#F8F8F8'
let lightBlue = '#50B6BB'
let mediumBlue = '#4BA9AD'
let darkBlue = '#45969B'
let orange = '#FF6830'

const Body = styled.div`
    background: ${whiteAccent};
    min-height: 90vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const TopSection = styled.div`
    width: 90vw;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media(min-width: 500px) {
        width: 80vw;
    }
`

const Title = styled.h3`
    color: ${darkBlue};
    font-size: 24px;
    text-align: center;
    padding-top: 10px;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    width: 25px;
    height: 25px;
    background: ${mediumBlue};
    color: ${whiteAccent};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    margin-top: 10px;
    font-size: 20px;
    font-weight: bold;

    &:hover {
        background: ${whiteAccent};
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
    border-bottom: 1px solid ${orange};
    font-size: 18px;
    padding: 0 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: ${lightBlue};
    position: relative;
    padding-top: 10px;
    margin: 0 5px;

    > label {
        position: absolute;
        bottom: 4px;
        right: 4px;
        font-size: 24px;
        color: rgba(0, 0, 0, .4);
    }
`
//  technically, this hover stuff is for desktop, not mobile. so. gotta change that up in the media queries.
const Buttons = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    text-align: center;

    > button {
        display: none;
        border: none;
        
    }
    
    &:hover {
        background: rgba(92, 92, 92, .5);
        display: flex;
        align-items: center;
        justify-content: space-evenly;

        > button {
            display: flex;
            justify-content: center;
            background: ${mediumBlue};
            width: 50px;
            height: 25px;
            border-radius: 4px;
            color: ${whiteAccent};

            :hover {
                background: ${orange};
            }

            :active {
                background: ${whiteAccent};
                color: ${darkAccent};
            }
        }
    }
`
