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

CREATE TABLE `comments` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `content` text,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `article_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;