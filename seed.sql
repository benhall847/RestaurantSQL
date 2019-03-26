insert into users
(first_name, last_name, email, password)
values
('Oakley', 'Jackson', 'superKat@kitty.nip', 'tunaCan'),
('Banana', 'Pirate', 'bananaBot@protonmail.com', 'bananaPeel'),
('Nutter', 'Butter', 'nut@but.ter', 'peanut')
;

insert into restaurants
(name, address, state, phone, menu, description, picture)
values
('tildeSlash','200 MillerPlanet', 'Cali', '555-5555', 'veggie','this is a great place to eat', '/in/my/folder'),
('callBack','1337 St', 'GA', '554-2319','foood', 'We make food', '/in/the/same/folder'),
('heartAttackGrill', 'coranary st', 'Al', '123-4567','hearts', 'We Grill Hearts', '/also/in/the/same/folder'),
('boobysBar', 'boob st', 'OR','2319-2319','boobs', 'We serve boobs','/in/my/folder' )
;


insert into favorites 
(user_id, restaurant_id)
values
(2, 3)
;


select * from users where id=2;

select first_name, last_name from users where id=2;

select * from favorites where user_id=2;

select * from reviews where user_id=2;

select * from restaurants where id=1;

select * from reviews where restaurant_id=1;

select count(*) from favorites where restaurant_id=4;

select AVG(score) from reviews where restaurant_id=4;

select * from restaurants where name ilike '%ea%';

select distinct r.name, AVG(rev.score), count(fav.user_id)
	from restaurants r
	inner join reviews rev 
		on r.id = rev.restaurant_id
	inner join favorites fav
		on r.id = fav.restaurant_id
	
where name ilike '%ea%'
group by r.name, fav.user_id;