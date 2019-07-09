select * from weights
where user_id = $1
order by exact_date desc;