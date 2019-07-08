import React from 'react'
import { Route, Switch } from 'react-router-dom'

import HomePage from './Components/HomePage/HomePage'
import Dashboard from './Components/Dashboard/Dashboard'
import AddFoodForm from './Components/AddFoodForm/AddFoodForm'
import EditFoodForm from './Components/EditFoodForm/EditFoodForm'
import AddMealForm from'./Components/AddMealForm/AddMealForm'
import NewMealLog from './Components/MealLog/MealLog'
import UpdateFood from './Components/UpdateFood/UpdateFood'
import AddWeightLog from './Components/AddWeightLog/AddWeightLog'
import ViewWeightLog from './Components/ViewWeightLog/ViewWeightLog'
import EditWeightForm from './Components/EditWeightForm/EditWeightForm'
import MainFoodLog from './Components/MainFoodLog/MainFoodLog'
import DayView from './Components/DayView/DayView'

export default (
    <Switch>
        <Route path='/editweight' component={EditWeightForm} />
        <Route path='/weightlog' component={ViewWeightLog} />
        <Route path='/addweight' component={AddWeightLog} />
        <Route path='/updatefood' component={UpdateFood} />
        <Route path='/dayview' component={DayView} />
        <Route path='/meallog' component={NewMealLog} />
        <Route path='/foodlog' component={MainFoodLog} />
        <Route path='/addmeal' component={AddMealForm} />
        <Route path='/editfood' component={EditFoodForm} />
        <Route path ='/foodsform' component={AddFoodForm} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/' exact component={HomePage} />
    </Switch>
)