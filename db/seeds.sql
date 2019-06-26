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
    fat int,
    fiber int,
    sugar int,
    quantity int,
    unit varchar,
    meal_id int references meals(meal_id)
);

create table meals (
    meal_id serial primary key,
    date_created varchar, 
    meal_number int,
    foods text,
    user_id int references users(user_id)
);