BEGIN;

TRUNCATE TABLE "Tool" RESTART IDENTITY CASCADE ;
TRUNCATE TABLE "Bookmark" RESTART IDENTITY CASCADE ;
TRUNCATE TABLE "User" RESTART IDENTITY CASCADE ;
TRUNCATE TABLE "Token" RESTART IDENTITY CASCADE ;
TRUNCATE TABLE "ToolsOnUsers" RESTART IDENTITY CASCADE ;

INSERT INTO "Tool"("name", "logo", "description")

	VALUES
	 ('Github', 'test', 'git'),
	 ('Stackoverflow', 'test2', 'stack'),
	 ('MDN', 'test3', 'Mozilla');

INSERT INTO "User"("email", "password", "firstname", "lastname", "username", "avatar")

	VALUES
  ('karim@gmail.com', 'dsqhdk', 'Karim', 'Romdhane', 'karim', 'test2'),
  ('enzo@gmail.com', 'ddsqdlsj', 'Enzo', 'Bacqueyrisses', 'enzo', 'test1'),
  ('floriane@test.fr', 'dsdffqqsd', 'Floriane', 'Perucchini', 'floriane', 'test3'),
  ('abdel@test.fr', 'dsdffqqsd', 'Abdel', 'Karim', 'abdel', 'test4'),
  ('azouaou@test.fr', 'dsdffqqsd', 'Azouaou', 'Benadda', 'test', 'test5');

INSERT INTO "Bookmark"(name, description, link, "linkImg", "userId", "toolId")

    VALUES
    ('Favorite1', 'Super favorite 1', 'link1', 'link image 1', 1, 2),
    ('Favorite1', 'Super favorite 1', 'link1', 'link image 1', 2, 1),
    ('Favorite1', 'Super favorite 1', 'link1', 'link image 1', 3, 3),
    ('Favorite1', 'Super favorite 1', 'link1', 'link image 1', 4, 2),
    ('Favorite1', 'Super favorite 1', 'link1', 'link image 1', 5, 1),
    ('Favorite1', 'Super favorite 1', 'link1', 'link image 1', 5, 2);



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





