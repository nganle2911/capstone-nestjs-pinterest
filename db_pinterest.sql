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
('sky', 'public/img/image1.jpg', 'Blue sky', 1),
('dog', 'public/img/image2.jpg', 'Cute dog', 2),
('villa', 'public/img/image3.jpg', 'Beautiful villa', 5),
('natural-landscape', 'public/img/image4.jpg', 'A beaufitul landscape with nature', 4),
('milk-tea', 'public/img/image5.jpg', 'Bubble tea of matcha', 5),
('web-dev-skills', 'public/img/image6.jpg', 'necessary web developer skills', 7),
('full-stack', 'public/img/image7.jpg', 'How to become a full stack developer in 2023', 7),
('souris-de-paris', 'public/img/image8.jpg', 'Learning French', 2),
('strawberry-cake', 'public/img/image9.jpg', 'Vegan strawberry cake recipe', 1),
('salad', 'public/img/image10.jpg', 'How to make a healthy salad', 1);

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

