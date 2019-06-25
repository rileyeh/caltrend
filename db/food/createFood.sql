insert into foods 
(food_name, calories, carbs, protein, fat, fiber, sugar, meal_id)
values
(${food_name}, ${calories}, ${carbs}, ${protein}, ${fat}, ${fiber}, ${sugar}, ${meal_id})
returning *;