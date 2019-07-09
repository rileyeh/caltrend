import React, { Component } from 'react'
import Nav from '../Nav/Nav'
import axios from 'axios'
import styled from 'styled-components'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setCurrentWeight } from '../../ducks/reducers/weight'
import pencil from '../../assets/PencilRed.svg'
import trash from '../../assets/TrashRed.svg'

class ViewWeightLog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            weights: [],
            rerender: false,
            buttons: false
        }
    }

    componentDidMount() {
        axios.get('/api/weight').then(res => {
            this.setState({
                weights: res.data,
                rerender: true
            })
        }).catch(err => console.log('error in view weight log', err))

        this.setButtonsTrue()
        window.addEventListener('resize', this.setButtonsTrue)
    }

    setButtonsTrue = () => {
        if (window.innerWidth < 500) {
            return this.setState({
                buttons: true
            })
        } else {
            return this.setState({
                buttons: false
            })
        }
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
                                    <h4>{weight.date_created}</h4>
                                    <p>{weight.pounds} pounds</p>
                                    <Buttons>
                                        <button><Link onClick={() => this.props.setCurrentWeight(weight)} to='/editweight' style={{'textDecoration':'none', 'textAlign':'center', 'color':'#F8F8F8'}}>edit</Link></button>
                                        <button onClick={() => this.deleteLog(weight.weight_id)} style={{'textAlign':'center'}}>delete</button>
                                    </Buttons>
                                    {this.state.buttons &&
                                    <MobileButtons>
                                        <button><Link onClick={() => this.props.setCurrentWeight(weight)} to='/editweight'><img style={{'height':25}} src={pencil} alt='edit'/></Link></button>
                                        <button onClick={() => this.deleteLog(weight.weight_id)}><img style={{'height':25}} src={trash} alt='delete'/></button>
                                    </MobileButtons>
                                    }
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
let red = '#FF5757'

const Body = styled.div`
    background: ${whiteAccent};
    min-height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media(min-width: 500px) {
        margin-left: 120px;
    }

    @media(min-width: 1000px) {
        margin-left: 160px;
    }
`


const TopSection = styled.div`
    width: 90vw;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media(min-width: 500px) {
        width: 75vw;
        padding-left: 20px;
        padding: 20px 0;
    }
`

const Title = styled.h3`
    color: ${lightBlue};
    font-weight: bold;
    font-size: 30px;
    padding: 20px 0;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    width: 30px;
    height: 30px;
    background: ${darkBlue};
    color: ${whiteAccent};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    margin: 10px 0;
    font-size: 28px;
    font-weight: bold;

    :hover {
        background: ${red};
        transform: translateY(-3px);
        box-shadow: 0px 10px 16px ${shadow};
    }

    :active {
        transform: translateY(-1px);
        box-shadow: 0px 5px 8px ${mediumShadow};
    }
`

const CardHolder = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const WeightCard = styled.div`
    width: 150px;
    height: 150px;
    border-bottom: 1px solid ${red};
    font-size: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: ${lightBlue};
    position: relative;
    margin: 0 5px;

    @media(min-width: 500px) {
        width: 40vw;
        height: 100px;
        margin: 10px;
        flex-direction: row;
        justify-content: space-evenly;
    }
`

const Buttons = styled.div`
    > button {
        display: none;
        border: none; 
    }
    
    @media(min-width: 500px) {
        width: 100%;
        height: 100%;
        position: absolute;
        text-align: center;

        
        &:hover {
            background: rgba(92, 92, 92, .6);
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
                    background: ${red};
                }

                :active {
                    background: ${whiteAccent};
                    color: ${darkAccent};
                }
            }
        }
    }
`

const MobileButtons = styled.div`
    width: 100%;
    padding-top: 20px;
    display: flex;
    justify-content: space-evenly;

    > button {
        background: none;
        border: none;
    }
`   