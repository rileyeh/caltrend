insert into weights (pounds, date_created, exact_date, user_id)
values (${pounds}, ${date_created}, ${exact_date}, ${user_id})
returning *;