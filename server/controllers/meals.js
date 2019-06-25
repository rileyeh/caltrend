module.exports = {
    getMealsByUser: async (req, res) => {
        const db = req.app.get('db')
        const { user_id } = req.session.user
        console.log(3201857, user_id)
        let meals = await db.meals.getMealsByUser(user_id)
        res.status(200).send(meals)
    },
    createMeal: async (req, res) => {
        const db = req.app.get('db')
        const { date, meal} = req.body
        const { user_id } = req.session.user
        // console.log(10101010, user_id)
        // console.log(282828282, req.body)
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