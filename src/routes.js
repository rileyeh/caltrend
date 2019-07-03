import React from 'react'
import { Route, Switch } from 'react-router-dom'

import HomePage from './Components/HomePage/HomePage'
import Dashboard from './Components/Dashboard/Dashboard'
import FoodLog from './Components/FoodLog/FoodLog'
import AddFoodForm from './Components/AddFoodForm/AddFoodForm'
import EditFoodForm from './Components/EditFoodForm/EditFoodForm'
import AddMealForm from'./Components/AddMealForm/AddMealForm'
import NewMealLog from './Components/MealLog/NewMealLog'
import UpdateFood from './Components/UpdateFood/UpdateFood'

export default (
    <Switch>
        <Route path='/updatefood' component={UpdateFood} />
        <Route path='/meallog' component={NewMealLog} />
        <Route path='/foodlog' component={FoodLog} />
        <Route path='/addmeal' component={AddMealForm} />
        <Route path='/editfood' component={EditFoodForm} />
        <Route path ='/foodsform' component={AddFoodForm} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/' exact component={HomePage} />
    </Switch>
)