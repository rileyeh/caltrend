import React from 'react'
import { Route, Switch } from 'react-router-dom'

import HomePage from './Components/HomePage/HomePage'
import Dashboard from './Components/Dashboard/Dashboard'
import FoodLog from './Components/FoodLog/FoodLog'

export default (
    <Switch>
        <Route path='/foodlog' component={FoodLog} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/' exact component={HomePage} />
    </Switch>
)