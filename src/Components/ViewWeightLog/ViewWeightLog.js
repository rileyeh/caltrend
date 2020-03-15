import React, { Component } from 'react'
import Nav from '../Nav/Nav'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setCurrentWeight } from '../../ducks/reducers/weight'
import pencil from '../../assets/PencilRed.svg'
import trash from '../../assets/TrashRed.svg'
import { Body, TopSection, Title, StyledLink, CardHolder, WeightCard, Buttons, MobileButtons } from './styles'

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