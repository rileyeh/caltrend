module.exports = {
    getFoodByMeal: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { meal_id } = req.body
            let foods = await db.food.getFoodByMeal([meal_id])
            res.status(200).send(foods)   
        } catch (error) {
            console.log('you have a read error in the food controller', error)
        }
    },
    createFood: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { food_name, calories, carbs, protein, fat, fiber, sugar, quantity, unit , meal_id, ndbno } = req.body
            let newFood = await db.food.createFood({
                food_name, 
                calories, 
                carbs, 
                protein, 
                fat, 
                fiber, 
                sugar, 
                quantity, 
                unit,
                meal_id,
                ndbno
            })
            res.status(200).send(newFood)
        } catch (error) {
            console.log('you have a creating error in the food controller', error)            
        }
    },
    deleteFood: async (req, res) => {
        try {
            const db = req.app.get('db')
            const {meal_id} = req.body
            const {id} = req.params
            let foods = await db.food.deleteFood({id, meal_id})
            console.log('are we getting the foods back', foods)
            res.status(200).send(foods)
        } catch (error) {
            console.log('you have a deleting error in the food controller', error)
        }
    },
    updateFood: async (req, res) => {
        try {
            const db = req.app.get('db')
            const {id} = req.params
            const { food_name, calories, carbs, protein, fat, fiber, sugar, quantity, unit } = req.body
            let foods = await db.food.updateFood({
                id, 
                food_name, 
                calories, 
                carbs, 
                protein, 
                fat, 
                fiber, 
                sugar, 
                quantity, 
                unit
            })
            res.status(200).send(foods)
        } catch (error) {
            console.log('you have an updating error in the food controller', error)                        
        }
    }
}