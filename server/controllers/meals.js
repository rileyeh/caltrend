module.exports = {
    getMealsByUser: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { user_id } = req.session.user
            let meals = await db.meals.getMealsByUser(user_id)
            res.status(200).send(meals)
        } catch (error) {
            console.log('error getting meal by user in the meals controller', error) 
        }
    },
    getMealsByDate: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { user_id } = req.session.user
            let meals = await db.meals.getMealsByDate(user_id)
            res.status(200).send(meals)
        } catch (error) {
            console.log('error getting meal by date in the meals controller', error)             
        }
    },
    getOneMeal: async (req, res) => {
        try {
            const db = req.app.get('db')
            const {id} = req.params
            let meal = await db.meals.getOneMeal(id)
            res.status(200).send(meal)
        } catch (error) {
            console.log('error getting one meal in the meals controller', error)             
        }
    },
    createMeal: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { date_created, meal, exact_date } = req.body
            const { user_id } = req.session.user
            let newMeal = await db.meals.createMeal({
                user_id, 
                date_created, 
                meal_number: meal,
                exact_date
            })
            res.status(200).send(newMeal)
        } catch (error) {
            console.log('error creating meal in the meals controller', error)                         
        }
    },
    deleteMeal: async (req, res) => {
        try {
            const db= req.app.get('db')
            const { meal_id, date_created } = req.body
            const { user_id } = req.session.user
            let meals = await db.meals.deleteMeal({meal_id, user_id, date_created})
            res.status(200).send(meals)
        } catch (error) {
            console.log('error deleting meal in the meals controller', error)                                     
        }
    },
    updateMeal: async (req, res)  => {
        try {
            const db = req.app.get('db')
            const {id} = req.params
            const {date, meal} = req.body

            let meals = await db.meals.updateMeal({
                id,
                date, 
                meal
            })

            res.status(200).send(meals)
        } catch (error) {
            console.log('error updating in the meals controller', error)
        }
    }
}