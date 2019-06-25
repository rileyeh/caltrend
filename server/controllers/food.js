module.exports = {
    getFoodByMeal: async (req, res) => {
        const db = req.app.get('db')
        const { meal_id } = req.body
        let foods = await db.food.getFoodByMeal(meal_id)
        res.status(200).send(foods)
    },
    createFood: async (req, res) => {
        const db = req.app.get('db')
        console.log('words') 
    }
}