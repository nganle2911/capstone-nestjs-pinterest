DROP DATABASE IF EXISTS db_pinterest;
CREATE DATABASE db_pinterest;
USE db_pinterest;

CREATE TABLE users(
	user_id INT PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(250),
	pass_word VARCHAR(100),
	full_name VARCHAR(250),
	age INT,
	avatar VARCHAR(250)
);



CREATE TABLE images(
	image_id INT PRIMARY KEY AUTO_INCREMENT,
	image_name VARCHAR(250),
	image_path VARCHAR(250),
	description VARCHAR(250),
	user_id INT,
	FOREIGN KEY (user_id) REFERENCES users(user_id)
);


CREATE TABLE comments(
	comment_id INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT,
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	image_id INT,
	FOREIGN KEY (image_id) REFERENCES images(image_id),
	comment_date DATE,
	content VARCHAR(250)
);



CREATE TABLE save_img(
	save_id INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT,
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	image_id INT,
	FOREIGN KEY (image_id) REFERENCES images(image_id),
	save_date DATE
);


