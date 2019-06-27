import React from 'react'
import { Route, Switch } from 'react-router-dom'

import HomePage from './Components/HomePage/HomePage'
import Dashboard from './Components/Dashboard/Dashboard'
import FoodLog from './Components/FoodLog/FoodLog'
import AddFoodForm from './Components/AddFoodForm/AddFoodForm';
import EditFoodForm from './Components/EditFoodForm/EditFoodForm';

export default (
    <Switch>
        <Route path='/foodlog' component={FoodLog} />
        <Route path='/editfood' component={EditFoodForm} />
        <Route path ='/foodsform' component={AddFoodForm} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/' exact component={HomePage} />
    </Switch>
)