create table dates_meals as
select distinct on (date_created)
    meal_id, date_created, user_id, exact_date
from meals
where user_id = ${user_id};

select * from dates_meals
where exact_date
order by exact_date;