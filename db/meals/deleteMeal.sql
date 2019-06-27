delete from foods 
where meal_id = ${meal_id};

delete from meals
where meal_id = ${meal_id};

select * from meals
where user_id = ${user_id};