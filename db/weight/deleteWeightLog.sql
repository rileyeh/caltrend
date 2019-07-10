delete from weights
where weight_id = ${id};

select * from weights
where user_id = ${user_id}
order by exact_date desc;