create table users(
 id int PRIMARY KEY AUTO_INCREMENT,
 nickname VARCHAR(255),
 avatar VARCHAR(255),
 job VARCHAR(255),
 introduce VARCHAR(255)
);

create table user_auths(
 id int PRIMARY KEY AUTO_INCREMENT not null,
 user_id int not null,
 identity_type VARCHAR(255),
 identfier VARCHAR(255),
 credential VARCHAR(255)
);

create table articles(
 id int PRIMARY KEY AUTO_INCREMENT not null,
 title VARCHAR(255),
 content TEXT,
 views int,
 is_delete bit,
 create_time DATETIME,
 update_time DATETIME,
 user_id int
)