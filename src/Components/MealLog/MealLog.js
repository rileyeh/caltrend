import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { setCurrentFood, setCurrentMeal } from '../../ducks/reducers/meals'
import { Link } from 'react-router-dom'
import Nav from '../Nav/Nav'
import axios from 'axios';

class MealLog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            foods: [],
            rerender: false
        }
    }

    componentDidMount() {
        let meal_id = this.props.id
        axios.post('api/food', {meal_id}).then(res => {
            this.setState({
                foods: res.data,
                rerender: true
            })
        }).catch(err => {
            console.log('error in the meal log', err)
        })
    }

    deleteFood = async id => {
        let meal_id = this.props.id

        await axios({
            method: 'DELETE',
            url: `/api/food/${id}`,
            data: {
                meal_id
            }
        }).then(res => {
            this.setState({
                foods: res.data,
                rerender: true
            })
        }).catch(err => {
            console.log('error in the meal log', err)
        })
    }

    render() {
        return (
            <div>
                <Nav/>

                <TopBar>
                    <label onClick={() => this.props.history.push('/foodlog')}>&#60;</label>
                    <h3>Meal Log</h3>
                </TopBar>

                <Body>

                <h3>{this.props.date} Meal {this.props.number}</h3>

                <StyledLink to='foodsform' onClick={() => this.props.setCurrentMeal(this.props.currentMeal)}>add foods</StyledLink>


                {this.state.rerender &&

                    this.state.foods.map((food, i) => {
                        console.log('foods mapped in the food log', food)
                        return (
                            <MealCard key={i}>
                                <CardHeader>
                                    <h5>{food.food_name}</h5>
                                    <div style={ {'display' : 'flex'} }>
                                        <p>{food.quantity}</p>
                                        <p>{food.unit}</p>
                                    </div>
                                    <div>
                                        <Link onClick={() => this.props.setCurrentFood(food)} to='/updatefood'>edit</Link>
                                        <button onClick={() => this.deleteFood(food.food_id)}>delete</button>
                                    </div>
                                </CardHeader>
                                <Nutrients>
                                    <p><span>calories</span><br/>{food.calories}</p>
                                    <p><span>protein</span><br/>{food.protein} g</p>
                                    <p><span>carbs</span><br/>{food.carbs} g</p>
                                    <p><span>fat</span><br/>{food.fat} g</p>
                                    <p><span>sugar</span><br/>{food.sugar} g</p>
                                    <p><span>fiber</span><br/>{food.fiber} g</p>
                                </Nutrients>
                            </MealCard>
                        )
                    })
                }
                </Body>

            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('state in the meal log', state)
    return {
        date: state.meals.currentMeal.date_created,
        number: state.meals.currentMeal.meal_number,
        id: state.meals.currentMeal.meal_id,
        currentMeal: state.meals.currentMeal
    }
}

export default connect(mapStateToProps, {setCurrentFood, setCurrentMeal})(MealLog)

// let darkGreen = '#219653'
// let mediumGreen = '#2DB969'
let greenBlue ='#28b485'
let darkAccent = '#5C5C5C'
let lightAccent = '#F8F8F8'

const TopBar = styled.div`
    width: 100vw;
    height: 45px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    background: ${darkAccent};
    color: ${lightAccent};

    > h3 {
        padding-left: 10px;
    }
`

const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    background: ${lightAccent};
    min-height: 90vh;
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
    margin: 10px 0;

    &:hover {
        background: ${darkAccent};
    }
`

const MealCard = styled.div`
    background: ${lightAccent};
`

const CardHeader = styled.div`
    background: ${greenBlue};
    color: ${lightAccent};
    display: flex;
    flex-direction: column;
    text-align: center;
`

const Nutrients = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    > p {
        width: 100px;
        text-align: center;
        margin: 5px;
    }

    > p > span {
        font-weight: bold;
    }
`