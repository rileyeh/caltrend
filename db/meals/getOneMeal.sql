select meal_id, date_created, meal_number, user_id, food_id
from meals
where meal_id = $1;