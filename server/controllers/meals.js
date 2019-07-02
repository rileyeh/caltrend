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
            const { date, meal} = req.body
            const { user_id } = req.session.user
            let newMeal = await db.meals.createMeal({
                user_id, 
                date_created: date, 
                meal_number: meal
            })
            res.status(200).send(newMeal)
        } catch (error) {
            console.log('error creating meal in the meals controller', error)                         
        }
    },
    deleteMeal: async (req, res) => {
        try {
            const db= req.app.get('db')
            const { meal_id } = req.params
            console.log('its the mealid from re params on delete', meal_id)
            const { user_id } = req.session.user
            let meals = await db.meals.deleteMeal({meal_id, user_id})
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



// createBot: async (req, res) => {
//     const db = req.app.get("db");
//     const { name, attack, health } = req.body;
//     const { user_id } = req.session.user;
//     console.log(user_id);

//     let bots = await db.bots.create_bot({
//       user_id,
//       bot_name: name,
//       attack,
//       health
//     });

//     res.status(200).send(bots);
//   },