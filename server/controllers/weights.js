module.exports = {
    getWeightLogs: async (req, res) => {
        try {
            const db =req.app.get('db')
            const {id} = req.params
            let weights = await db.weight.getWeightLogsByUser(id)
            res.status(200).send(weights)
        } catch (error) {
            console.log('error with get in weight controller', error)
        }
    },
    createWeightLog: async (req, res) => {
        try {
            const db =req.app.get('db')
            const { pounds, date_created, exact_date } = req.body
            let newWeight = await db.weight.createWeightLog({
                pounds, 
                date_created, 
                exact_date})      
            res.status(200).send(newWeight)
        } catch (error) {
            console.log('error with post in weight controller', error)
        }
    },
    deleteWeightLog: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { user_id } = req.session.user
            const { id } = req.params
            let weights = await db.weight.deleteWeightLog({user_id, id})
            res.status(200).send(weights)
        } catch (error) {
            console.log('error with delete in weight controller', error)
        }
    },
    updateWeightLog: async (req, res) => {
        try {
            const db = req.app.get('db')
            const {id} = req.params
            const { pounds, date_created, exact_date} = req.body
            let weight = await db.weight.updateWeightLog({
                pounds, 
                date_created,
                exact_date,
                id
            })
            res.status(200).send(weight)
        } catch (error) {
            console.log('error with put in weight controller', error)
        }
    }
}