module.exports = {
    getFoodByMeal: async (req, res) => {
        const db = req.app.get('db')
        const { meal_id } = req.body
        let foods = await db.food.getFoodByMeal(meal_id)
        res.status(200).send(foods)
    },
    createFood: async (req, res) => {
        const db = req.app.get('db')
        const { food_name, calories, carbs, protein, fat, fiber, sugar, meal_id } = req.body
        let newFood = await db.food.createFood({
            food_name, 
            calories, 
            carbs, 
            protein, 
            fat, 
            fiber, 
            sugar, 
            meal_id
        })
        res.status(200).send(newFood)
    }
}