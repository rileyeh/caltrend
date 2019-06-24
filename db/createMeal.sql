insert into meals (date_created, meal_number)
values (${date_created}, ${meal_number})
returning *;