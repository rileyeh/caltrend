update weights
set
    pounds = ${pounds},
    date_created = ${date_created},
    exact_date = ${exact_date}
where weight_id = ${id};