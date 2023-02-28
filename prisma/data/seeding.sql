BEGIN;

TRUNCATE TABLE "Tool" RESTART IDENTITY CASCADE ;
TRUNCATE TABLE "Bookmark" RESTART IDENTITY CASCADE ;
TRUNCATE TABLE "User" RESTART IDENTITY CASCADE ;
TRUNCATE TABLE "Token" RESTART IDENTITY CASCADE ;
TRUNCATE TABLE "ToolsOnUsers" RESTART IDENTITY CASCADE ;
TRUNCATE TABLE "Image" RESTART IDENTITY CASCADE ;

INSERT INTO "Image"("fileName", "filePath", "mimeType", "size")

VALUES
    ('test1', '/images/test1.jpg', 'jpg', 3754),
    ('test2', '/images/test2.jpg', 'png', 27238),
    ('test3', '/images/test3.jpg', 'jpg', 1024),
    ('test4', '/images/test4.jpg', 'png', 2000),
    ('test5', '/images/test5.jpg', 'png', 2000);

INSERT INTO "Tool"("name", "logo", "description")

	VALUES
	 ('Github', 'test', 'git'),
	 ('Stackoverflow', 'test2', 'stack'),
	 ('MDN', 'test3', 'Mozilla');

INSERT INTO "User"("email", "password", "firstname", "lastname", "username", "imgId")

	VALUES
  ('karim@gmail.com', 'D09eodhenziedz!', 'Karim', 'Romdhane', 'karim', 1),
  ('enzo@gmail.com', 'D09eodhenziedz!', 'Enzo', 'Bacqueyrisses', 'enzo', 2),
  ('floriane@test.fr', 'D09eodhenziedz!', 'Floriane', 'Perucchini', 'floriane', null),
  ('abdel@test.fr', 'D09eodhenziedz!', 'Abdel', 'Karim', 'abdel', 4),
  ('azouaou@test.fr', 'D09eodhenziedz!', 'Azouaou', 'Benadda', 'test', 5);

INSERT INTO "Bookmark"(name, description, link, "imgId", "userId", "toolId")

    VALUES
    ('Favorite1', 'Super favorite 1', 'link1', 1, 1, 2),
    ('Favorite1', 'Super favorite 1', 'link1', 2, 2, 1),
    ('Favorite1', 'Super favorite 1', 'link1', 3, 3, 3),
    ('Favorite1', 'Super favorite 1', 'link1', 3, 4, 2),
    ('Favorite1', 'Super favorite 1', 'link1', 1, 5, 1),
    ('Favorite1', 'Super favorite 1', 'link1', null, 5, 2);

INSERT INTO "Token"("expiration", "userId", "emailToken", "jwtRefreshToken")

VALUES
    (1000, 1, '20000', 'hjfeiuzhfeiuz'),
    (1000, 2, '3000', 'vdvdevezve'),
    (1000, 3, '40000', 'vcdsvezvgrve'),
    (1000, 4, '50000', 'doizefijnze'),
    (1000, 5, '60000', 'fbezhufezh');

INSERT INTO "ToolsOnUsers" ("userId", "toolId")

VALUES
    (1, 2),
    (2, 1),
    (3, 3);

COMMIT;





