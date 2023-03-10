-- Active: 1677690303576@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    user_id TEXT NOT NULL,
    content TEXT NOT NULL,
    comment INTEGER DEFAULT (0) NOT NULL,
    likes INTEGER DEFAULT (0) NOT NULL,
    dislikes INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE comments (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    comment TEXT NOT NULL,
    likes INTEGER DEFAULT (0) NOT NULL,
    dislikes INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE posts_likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,    
    FOREIGN KEY (post_id) REFERENCES posts (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE comments_likes_dislikes(
    user_id TEXT NOT NULL,
    comment_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,    
    FOREIGN KEY (comment_id) REFERENCES comments (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE users;
DROP TABLE posts;
DROP TABLE comments;
DROP TABLE posts_likes_dislikes;
DROP TABLE comments_likes_dislikes;


INSERT INTO users (id, name, email, password)
VALUES
("u001","labaluno83", "labaluno83@email.com", "123erd"),
("u002","labaluno8","labaluno8@email.com","345ety"),
("u003","labaluno33","labaluno33@email.com","678eyu"),
("u004","labaluno823","labaluno823@email.com","653efg"),
("u005","labaluno12","labaluno12@email.com","876hjd"),
("u006","username","username@email.com","098jkn");

SELECT * FROM users;

INSERT INTO posts (id, user_id, content)
VALUES
("p001", "u001", "Porque a maioria dos desenvolvedores usam Linux? ou as empresas de tecnologia usam Linux?"),
("p002", "u002", "Qual super poder você gostaria de ter?"),
("p003", "u003", "Se você pudesse ter qualquer tipo de pet, qual você escolheria?"),
("p004", "u004", "Se você tivesse que comer apenas uma coisa para o resto da sua vida, o que você escolheria?");

SELECT * FROM posts;

INSERT INTO comments (id, user_id, post_id, comment)
VALUES 
("c001", "u005", "p001", "Não posso falar por todos, mas usar Linux ajudou meu pc a ter uma performace melhor (e evitou que eu precisasse comprar um novo)"),
("c002", "u006", "p001", "Não é a maioria, já vi umas enquetes, inclusive nesse sub, se não me engano, onde Windows ganhava na quantidade de usuários. Linux é rápido, tem várias opções para diferentes gostos.");

SELECT * FROM comments;

INSERT INTO posts_likes_dislikes (user_id, post_id, like)
VALUES 
("u002", "p001", 1),
("u003", "p002", 1),
("u001", "p003", 0);

SELECT * FROM posts_likes_dislikes;

INSERT INTO comments_likes_dislikes (user_id, comment_id, like)
VALUES 
("u001", "c001", 1),
("u002", "c001", 1),
("u003", "c002", 1);

SELECT * FROM comments_likes_dislikes;
