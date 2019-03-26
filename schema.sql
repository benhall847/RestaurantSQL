create table users (
    id serial primary key,
    first_name varchar(100),
    last_name varchar(100),
    email varchar(200),
    password varchar(500) 
);

create table reviews (
    id serial primary key,
    score integer,
    textContent text,
    restaurant_id integer references restaurants(id),
    user_id integer references users(id)
);

create table restaurants (
    id serial primary key,
    name varchar(200),
    address varchar(200),
    state varchar(200),
    phone varchar(20),
    menu varchar(20),
    description varchar(200),
    picture varchar(500) --URL ONLY
);

create table favorites (
    id serial primary key,
    user_id integer references users(id),
    restaurant_id integer references restaurants(id)
);


-- user profile

--user's id
--user's firstname/last_name
--user's email (optional)
--user's favorite restaurants
--user's restuarant reviews


-- restaurant profile

--get all info for a restaurant by ID
--get all reviews for restaurant by ID
--get average review for a restaurant by ID
--count of favorites


-- restaurant search result

--filter by minimum review
--get all matching rows for restaurant by name
--include average review
--pagination





