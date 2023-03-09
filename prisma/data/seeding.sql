BEGIN;

TRUNCATE TABLE "Tool" RESTART IDENTITY CASCADE ;
TRUNCATE TABLE "Bookmark" RESTART IDENTITY CASCADE ;
TRUNCATE TABLE "User" RESTART IDENTITY CASCADE ;
TRUNCATE TABLE "Token" RESTART IDENTITY CASCADE ;
TRUNCATE TABLE "ToolsOnUsers" RESTART IDENTITY CASCADE ;
TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE ;
TRUNCATE TABLE "Avatar" RESTART IDENTITY CASCADE ;

INSERT INTO "Category"("name", "description", "order")

VALUES
    ('General', 'General Category Description', 1),
    ('Playground', 'Playground Category Description', 2);

INSERT INTO "Tool"("name", "description", "icon", "link", "order", "categoryId")

VALUES
    ('News', 'Latest developers news', 'icon','/app/news',1, 1),
    ('Search', 'Search for NPMs, Stackoverflow & Github', 'icon', '/app/search',2, 1),
    ('HTML',  'HTML, CSS and Javascript playground',  'icon', '/app/playground-html', 1, 2),
    ('Javascript', 'Pure Javascript playground',  'icon', '/app/playground-js', 2, 2);

INSERT INTO "User"("email", "password", "firstname", "lastname", "username", "active", "website")

VALUES
    ('karim@gmail.com', '$2b$12$kG3nFBKrQ/Ve8hfqQYlHW.Mg61hxUS0NyDWeaLjQ7otICixTNo.7W', 'Karim', 'Romdhane', 'karim', true,'https///website.com'),
    ('enzo@gmail.com', '$2b$12$kG3nFBKrQ/Ve8hfqQYlHW.Mg61hxUS0NyDWeaLjQ7otICixTNo.7W', 'Enzo', 'Bacqueyrisses', 'enzo', true,'https///website.com'),
    ('floriane@test.fr', '$2b$12$kG3nFBKrQ/Ve8hfqQYlHW.Mg61hxUS0NyDWeaLjQ7otICixTNo.7W', 'Floriane', 'Perucchini', 'floriane',true, 'https///website.com'),
    ('abdel@test.fr', '$2b$12$kG3nFBKrQ/Ve8hfqQYlHW.Mg61hxUS0NyDWeaLjQ7otICixTNo.7W', 'Abdel', 'Karim', 'abdel', true,'https///website.com'),
    ('azouaou@test.fr', '$2b$12$kG3nFBKrQ/Ve8hfqQYlHW.Mg61hxUS0NyDWeaLjQ7otICixTNo.7W', 'Azouaou', 'Benadda', 'test', true,'https///website.com');

INSERT INTO "Avatar"("fileName", "filePath", "url", "size", "userId")

VALUES
    ('test1', 'avatar-user-1.webp', 'localhost:3000/images/avatar-user1.webp', 3754, 1),
    ('test2', 'avatar-user-2.webp', 'localhost:3000/images/avatar-user2.webp', 754, 2);


INSERT INTO "Bookmark"("name", "description", "link", "imgLink", "userId", "toolId")

VALUES
    ('Favorite1', 'Super favorite 1', 'link1', '/image', 1, 2),
    ('Favorite2', 'Super favorite 1', 'link1', '/image', 2, 1),
    ('Favorite3', 'Super favorite 1', 'link1', '/image', 3, 2),
    ('Favorite4', 'Super favorite 1', 'link1', '/image', 4, 2),
    ('Favorite5', 'Super favorite 1', 'link1', '/image', 1, 1),
    ('Favorite6', 'Super favorite 1', 'link1', '/image', 2, 2);

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
