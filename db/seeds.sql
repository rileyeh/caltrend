create table users (
    user_id serial primary key, 
    name varchar,
    email varchar,
    password varchar
);

create table foods (
    food_id serial primary key,
    food_name varchar,
    calories int,
    carbs int,
    protein int,
    fat int
);

create table meals (
    meal_id serial primary key,
    date_created date, 
    meal_number int,
    user_id int references users(user_id),
    food_id int references foods(food_id)
);