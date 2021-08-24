create table restaurants(
 id BIGSERIAL not null primary key,
 name varchar(50) not null,
 location  varchar(50) not null,
 price_range int not null check(price_range >= 1 and price_range <= 5)
);

insert into restaurants(name, location, price_range) values('Nandu', 'Kaduna', 4);
insert into restaurants(name, location, price_range) values('Stay Alive', 'Lagos', 3);
insert into restaurants(name, location, price_range) values('Eat Well', 'Abuja', 5);
insert into restaurants(name, location, price_range) values('Meat Enough', 'Keffi', 2);
insert into restaurants(name, location, price_range) values('Share Along', 'Kano', 5);
insert into restaurants(name, location, price_range) values('Eat More', 'Kafanchan', 3);
insert into restaurants(name, location, price_range) values('Shiraton', 'Abuja', 5);

create table reviews(
id BIGSERIAL not null primary key,
restaurant_id BIGINT not null primaryREFERENCES restaurant(id),
 name varchar(50) not null,
 review text not null,
 rating INT not null check(rating>= 1 and rating <= 5)
);
