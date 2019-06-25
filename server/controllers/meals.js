module.exports = {
    getMealsByUser: async (req, res) => {
        const db = req.app.get('db')
        const { user_id } = req.session.user
        let meals = await db.meals.getMealsByUser(user_id)
        res.status(200).send(meals)
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