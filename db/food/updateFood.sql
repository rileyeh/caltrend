update foods
set
    food_name = ${food_name},
    calories = ${calories},
    carbs = ${carbs},
    protein = ${protein},
    fat = ${fat},
    fiber = ${fiber},
    sugar = ${sugar},
    quantity = ${quantity},
    unit = ${unit}
where 
    food_id = ${id};