import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCurrentFood, setCurrentMeal } from '../../ducks/reducers/meals'
import { Link, Redirect } from 'react-router-dom'
import Nav from '../Nav/Nav'
import axios from 'axios'
import pencil from '../../assets/PencilRed.svg'
import trash from '../../assets/TrashRed.svg'
import { Body, TopBar, TopBarText, StyledLink, MealCard, CardHeader, HeaderBottom, Buttons, Button, Nutrients } from './styles'
class MealLog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            foods: [],
            render: false
        }
    }

    componentDidMount() {
        let {id} = this.props
        axios.get(`api/food/${id}`).then(res => {
            this.setState({
                foods: res.data,
                render: true
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
                foods: res.data
            })
        }).catch(err => {
            console.log('error in the meal log', err)
        })
    }

    render() {
        if (!this.props.user) {
            return <Redirect to='/' />
          }
        return (
            <div>
                <Nav/>

                <Body>
                <TopBar>
                    <TopBarText>
                        <label onClick={() => this.props.history.push('/dayview')}>&#60;</label>
                        <div>
                            <h2>Meal {this.props.number}</h2>
                            <h5>{this.props.date} </h5>
                        </div>
                    </TopBarText>
                    <StyledLink to='/foodsform' onClick={() => this.props.setCurrentMeal(this.props.currentMeal)}>+</StyledLink>
                </TopBar>


                {this.state.render &&

                    this.state.foods.map((food, i) => {
                        return (
                            <MealCard key={i}>
                                <CardHeader>
                                    <span>{food.food_name.slice(0, -19).replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()})}</span>
                                    <HeaderBottom>
                                        <p>{food.quantity} {food.unit}</p>
                                    <Buttons>
                                        <Button><Link onClick={() => this.props.setCurrentFood(food)} to='/updatefood'><img src={pencil} alt='edit' style={{'height':25}}/></Link></Button>
                                        <Button onClick={() => this.deleteFood(food.food_id)}><img src={trash} alt='edit' style={{'height':25}}/></Button>
                                    </Buttons>
                                    </HeaderBottom>
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

                {/* add in a totals here, and then i think we can send that back to the day view */}
                </Body>

            </div>
        )
    }
}

function mapStateToProps(state) {
    let { data: user } = state.user
    return {
        date: state.meals.currentMeal.date_created,
        number: state.meals.currentMeal.meal_number,
        id: state.meals.currentMeal.meal_id,
        currentMeal: state.meals.currentMeal,
        user
    }
}


export default connect(mapStateToProps, {setCurrentMeal, setCurrentFood})(MealLog)