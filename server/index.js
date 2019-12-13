require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')

const AuthCtrl = require('./controllers/auth')
const MealCtrl = require('./controllers/meals')
const FoodCtrl = require('./controllers/food')
const WeightCtrl = require('./controllers/weights')

const app = express()

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db is connected')
}).catch(err => console.log('cannot connect to database', err))

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false, 
    cookie: {
        maxAge: 1000 * 60 * 60 * 24* 365
    }
}))
app.use(express.static( `${__dirname}/../build` ))

// auth
app.post('/auth/register', AuthCtrl.register)
app.post('/auth/login', AuthCtrl.login)
app.get('/auth/logout', AuthCtrl.logout)
app.get('/auth/currentUser', AuthCtrl.currentUser)

// meals
app.get('/api/meals', MealCtrl.getMealsByUser)
app.get('/api/meal/:id', MealCtrl.getOneMeal)
app.get('/api/mealsbydate', MealCtrl.getMealsByDate)
app.post('/api/meals', MealCtrl.createMeal)
app.delete('/api/meal', MealCtrl.deleteMeal)
app.put('/api/meal/:id', MealCtrl.updateMeal)

// foods
app.get('/api/food/:id', FoodCtrl.getFoodByMeal)
app.post('/api/newFood', FoodCtrl.createFood)
app.delete('/api/food/:id', FoodCtrl.deleteFood)
app.put('/api/food/:id', FoodCtrl.updateFood)

// weights
app.get('/api/weight', WeightCtrl.getWeightLogs)
app.post('/api/weight', WeightCtrl.createWeightLog)
app.delete('/api/weight/:id', WeightCtrl.deleteWeightLog)
app.put('/api/weight/:id', WeightCtrl.updateWeightLog)

app.listen(SERVER_PORT, () => console.log(`running on port ${SERVER_PORT}`))