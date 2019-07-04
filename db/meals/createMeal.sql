insert into meals (user_id, date_created, meal_number, exact_date)
values (${user_id}, ${date_created}, ${meal_number}, ${exact_date})
returning *;