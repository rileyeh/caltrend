insert into foods 
(food_name, calories, carbs, protein, fat, fiber, sugar, quantity, unit, meal_id)
values
(${food_name}, ${calories}, ${carbs}, ${protein}, ${fat}, ${fiber}, ${sugar}, ${quantity}, ${unit}, ${meal_id})
returning *;