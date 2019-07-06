select * from meals
where user_id = $1
order by exact_date;;