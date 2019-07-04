insert into weights (pounds, date_created, exact_date)
values (${pounds}, ${date_created}, ${exact_date})
returning *;