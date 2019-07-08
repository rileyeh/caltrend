select 
    f.food_id,
    f.calories,
    f.protein,
    f.carbs,
    f.fat,
    f.sugar,
    f.fiber,
    f.meal_id,
    m.meal_id, 
    m.date_created,
    m.exact_date,
    m.meal_number,
    m.user_id
from 
    foods f
inner join meals m on f.meal_id = m.meal_id
where m.user_id = $1
order by m.exact_date desc;