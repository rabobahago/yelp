create table restaurants(
 id BIGSERIAL not null primary key,
 name varchar(50) not null,
 location  varchar(50) not null,
 price_range int not null check(price_range >= 1 and price_range <= 5)
);
drop table reviews;
drop table restaurants;
insert into restaurants(name, location, price_range) values('Nandu', 'Kaduna', 4);
insert into restaurants(name, location, price_range) values('Stay Alive', 'Lagos', 3);
insert into restaurants(name, location, price_range) values('Eat Well', 'Abuja', 5);
insert into restaurants(name, location, price_range) values('Meat Enough', 'Keffi', 2);
insert into restaurants(name, location, price_range) values('Share Along', 'Kano', 5);
insert into restaurants(name, location, price_range) values('Eat More', 'Kafanchan', 3);
insert into restaurants(name, location, price_range) values('Shiraton', 'Abuja', 5);


select * from restaurants;

create table reviews(
id BIGSERIAL not null primary key,
restaurant_id BIGINT not null REFERENCES restaurants(id),
 name varchar(50) not null,
 review text not null,
 rating INT not null check(rating>= 1 and rating <= 5)
);
insert into reviews(restaurant_id, name, review, rating) values(1, 'rabo yusuf', 'I really like the atmosphere, 
good coffee, and nice interior. This is a good place to study or chill with friends. 
The drinks and foods were all tasty and worthwhile. If you’re up for a fresh place 
with beautiful architecture then this is a must to visit.', 5);
insert into reviews(restaurant_id, name, review, rating) values(3, 'Mark Dorcas', 'This place is amazing! They offered the best coffee 
and showed the best attitude to its costumers. Internet connection is very fast and is unlimited as well. 
This place is indeed perfect for studying and chilling out. It was very quiet and air-conditioned. 
I just want to keep coming back to this place. Thank you!', 2);
insert into reviews(restaurant_id, name, review, rating) values(1, 'rabo yusuf', 'I really like the atmosphere, good coffee, and nice 
interior. This is a good place to study or chill with friends. The drinks and foods were all tasty and worthwhile. 
If you’re up for a fresh place with beautiful architecture then this is a must to visit.', 4);
insert into reviews(restaurant_id, name, review, rating) values(3, 'Mark Dorcas', 'This place is amazing! They offered the best coffee and 
showed the best attitude to its costumers. Internet connection is very fast and is unlimited as well. 
This place is indeed perfect for studying and chilling out. It was very quiet and air-conditioned. 
I just want to keep coming back to this place. Thank you!', 4);

select * from reviews;
select * from restaurants;
select restaurant_id, count(restaurant_id) from reviews group by (restaurant_id);

select * from restaurants inner join reviews on restaurants.id = reviews.restaurant_id;


select * from restaurants left join (select restaurant_id, count(*), TRUNC(avg(rating), 1) 
as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;

create extension if not exists "uuid-ossp";
create table users(
	user_id uuid primary key default uuid_generate_v4(),
	user_name varchar(255) not null,
	user_email varchar(255) not null,
	user_password varchar(255) not null
);

insert into users(user_name, user_email, user_password) values('rabo', 'rabobahago@gmail.com', '123456');

select * from users;