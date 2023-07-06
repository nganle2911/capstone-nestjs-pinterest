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

INSERT INTO users (email, pass_word, full_name, age, avatar) VALUES
('sophia@example.com', '1234', 'Sophia', 25, 'sophia.jpg'),
('william@example.com', '6789', 'William', 30, 'william.jpg'),
('james@example.com', '141002', 'James', 28, 'james.jpg'),
('emily@example.com', '291193', 'Emily', 32, 'emily.jpg'),
('mia@example.com', '140296', 'Mia', 27, 'mia.jpg'),
('isabelle@example.com', '230690', 'Isabelle', 31, 'isabelle.jpg'),
('liam@example.com', '100495', 'Liam', 29, 'liam.jpg'),
('ethan@example.com', '190999', 'Ethan', 26, 'ethan.jpg'),
('john@example.com', '290402', 'John', 33, 'john.jpg'),
('noah@example.com', '230502', 'Noah', 24, 'noah.jpg');

CREATE TABLE images(
	image_id INT PRIMARY KEY AUTO_INCREMENT,
	image_name VARCHAR(250),
	image_path VARCHAR(250),
	description VARCHAR(250),
	user_id INT,
	FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO images (image_name, image_path, description, user_id) VALUES
('image1', 'path/to/image1.jpg', 'Description for image 1', 1),
('image2', 'path/to/image2.jpg', 'Description for image 2', 2),
('image3', 'path/to/image3.jpg', 'Description for image 3', 3),
('image4', 'path/to/image4.jpg', 'Description for image 4', 4),
('image5', 'path/to/image5.jpg', 'Description for image 5', 5),
('image6', 'path/to/image6.jpg', 'Description for image 6', 6),
('image7', 'path/to/image7.jpg', 'Description for image 7', 7),
('image8', 'path/to/image8.jpg', 'Description for image 8', 8),
('image9', 'path/to/image9.jpg', 'Description for image 9', 9),
('image10', 'path/to/image10.jpg', 'Description for image 10', 10);

CREATE TABLE comments(
	comment_id INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT,
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	image_id INT,
	FOREIGN KEY (image_id) REFERENCES images(image_id),
	comment_date DATE,
	content VARCHAR(250)
);

INSERT INTO comments (user_id, image_id, comment_date, content) VALUES
(1, 1, '2023-07-02', 'Comment 1 for image 1'),
(2, 1, '2023-07-02', 'Comment 2 for image 1'),
(3, 2, '2023-07-02', 'Comment 1 for image 2'),
(4, 3, '2023-07-02', 'Comment 1 for image 3'),
(5, 4, '2023-07-02', 'Comment 1 for image 4'),
(6, 5, '2023-07-02', 'Comment 1 for image 5'),
(7, 6, '2023-07-02', 'Comment 1 for image 6'),
(8, 7, '2023-07-02', 'Comment 1 for image 7'),
(9, 8, '2023-07-02', 'Comment 1 for image 8'),
(10, 9, '2023-07-02', 'Comment 1 for image 9');

CREATE TABLE save_img(
	user_id INT,
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	image_id INT,
	FOREIGN KEY (image_id) REFERENCES images(image_id),
	save_date DATE
);

INSERT INTO save_img (user_id, image_id, save_date) VALUES
(1, 1, '2023-07-02'),
(2, 1, '2023-07-02'),
(3, 2, '2023-07-02'),
(4, 3, '2023-07-02'),
(5, 4, '2023-07-02'),
(6, 5, '2023-07-02'),
(7, 6, '2023-07-02'),
(8, 7, '2023-07-02'),
(9, 8, '2023-07-02'),
(10, 9, '2023-07-02');

