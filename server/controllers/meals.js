module.exports = {
    getMealsByUser: async (req, res) => {
        const db = req.app.get('db')
        const { user_id } = req.session.user
        let meals = await db.meals.getMealsByUser(user_id)
        res.status(200).send(meals)
    },
    getOneMeal: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        let meal = await db.meals.getOneMeal(id)
        res.status(200).send(meal)
    },
    createMeal: async (req, res) => {
        const db = req.app.get('db')
        const { date, meal} = req.body
        const { user_id } = req.session.user
        let newMeal = await db.meals.createMeal({
            user_id, 
            date_created: date, 
            meal_number: meal
        })
        res.status(200).send(newMeal)
    },
    deleteMeal: async (req, res) => {
        const db= req.app.get('db')
        const { meal_id } = req.params
        const { user_id } = req.session.user
        console.log('figuring stuff out', meal_id, user_id)
        let meals = await db.meals.deleteMeal({meal_id, user_id})
        res.status(200).send(meals)
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