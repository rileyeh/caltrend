module.exports = {
    getMeals : async (req, res) => {
        const db = req.app.get('db')
        let meals = await db.getMeals()
        res.status(200).send(meals)
    },
    createMeal:  (req, res) => {
        const db = req.app.get('db')
        const { date, meal, food } = req.body
        const { user_id } = req.session.user
        console.log(10101010, user_id)
        console.log(282828282, req.body)
        res.send(user_id)
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