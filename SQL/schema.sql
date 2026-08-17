CREATE DATABASE puzzle_game
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

CREATE USER 'puzzle_user'@'localhost'
IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES
ON puzzle_game.*
TO 'puzzle_user'@'localhost';

FLUSH PRIVILEGES;