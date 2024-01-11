CREATE DATABASE IF NOT EXISTS linkib_users;

USE linkib_users;

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(1000) NOT NULL,
    spotify_link VARCHAR(200),
    discord_link VARCHAR(200),
    steam_link VARCHAR(200),
    color_scheme VARCHAR(200),
    token VARCHAR(200) UNIQUE NOT NULL,
    admin BOOLEAN DEFAULT FALSE
);
