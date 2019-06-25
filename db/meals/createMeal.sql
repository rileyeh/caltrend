insert into meals (user_id, date_created, meal_number)
values (${user_id}, ${date_created}, ${meal_number})
returning *;