require('dotenv/config')
const express = require('express')
const massive = require('massive')
const session = require('express-session')

const AuthCtrl = require('./controllers/auth')
const MealCtrl = require('./controllers/meals')
const FoodCtrl = require('./controllers/food')

const app = express()

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db is connected')
})

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false, 
    cookie: {
        maxAge: 1000 * 60 * 60 * 24* 365
    }
}))

// auth
app.post('/auth/register', AuthCtrl.register)
app.post('/auth/login', AuthCtrl.login)
app.get('/auth/logout', AuthCtrl.logout)
app.get('/auth/currentUser', AuthCtrl.currentUser)

// meals
app.get('/api/meals', MealCtrl.getMealsByUser)
app.get('/api/meal/:id', MealCtrl.getOneMeal)
app.post('/api/meals', MealCtrl.createMeal)
app.delete('/api/meal/:meal_id', MealCtrl.deleteMeal)
app.put('/api/meal/:id', MealCtrl.updateMeal)

// foods
app.post('/api/food', FoodCtrl.getFoodByMeal)
app.post('/api/newFood', FoodCtrl.createFood)
app.delete('/api/food/:id', FoodCtrl.deleteFood)


app.listen(SERVER_PORT, () => console.log(`running on port ${SERVER_PORT}`))