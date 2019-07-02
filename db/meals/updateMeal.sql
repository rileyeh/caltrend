update meals
set
    date_created = ${date},
    meal_number = ${meal}
where
    meal_id = ${id};

select * from meals;