BEGIN;

TRUNCATE TABLE "Tool" RESTART IDENTITY CASCADE ;
TRUNCATE TABLE "Bookmark" RESTART IDENTITY CASCADE ;
TRUNCATE TABLE "User" RESTART IDENTITY CASCADE ;
TRUNCATE TABLE "Token" RESTART IDENTITY CASCADE ;
TRUNCATE TABLE "ToolsOnUsers" RESTART IDENTITY CASCADE ;
TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE ;
TRUNCATE TABLE "Image" RESTART IDENTITY CASCADE ;


INSERT INTO "Category"("name", "description",  "order")

VALUES
    ('slack', 'slack description', 1),
    ('github', 'github description', 2),
    ('dev', 'dev description',  1),
    ('facebook', 'facebook description', 2);

INSERT INTO "Tool"("name", "description", "icon", "link", "order")

	VALUES
	 ('News', 'Latest developers news',  'icon','/app/news',1),
	 ('Search', 'Search for NPMs, Stackoverflow & Github', 'icon', '/app/search',2),
	 ('HTML',  'HTML, CSS and Javascript playground',  'icon', '/app/playground-html', 1),
	 ('javascript', 'Pure Javascript playground',  'icon', '/app/playground-js', 2);

INSERT INTO "Category"("name", "description", "order",)

    VALUES
    ('General', 'General Category Description', 1),
    ('Playground', 'Playground Category Description', 2);


INSERT INTO "User"("email", "password", "firstname", "lastname", "username", "active", "website")

	VALUES
  ('karim@gmail.com', '$2b$12$kG3nFBKrQ/Ve8hfqQYlHW.Mg61hxUS0NyDWeaLjQ7otICixTNo.7W', 'Karim', 'Romdhane', 'karim', true,'https///website.com'),
  ('enzo@gmail.com', '$2b$12$kG3nFBKrQ/Ve8hfqQYlHW.Mg61hxUS0NyDWeaLjQ7otICixTNo.7W', 'Enzo', 'Bacqueyrisses', 'enzo', true,'https///website.com'),
  ('floriane@test.fr', '$2b$12$kG3nFBKrQ/Ve8hfqQYlHW.Mg61hxUS0NyDWeaLjQ7otICixTNo.7W', 'Floriane', 'Perucchini', 'floriane',true, 'https///website.com'),
  ('abdel@test.fr', '$2b$12$kG3nFBKrQ/Ve8hfqQYlHW.Mg61hxUS0NyDWeaLjQ7otICixTNo.7W', 'Abdel', 'Karim', 'abdel', true,'https///website.com'),
  ('azouaou@test.fr', '$2b$12$kG3nFBKrQ/Ve8hfqQYlHW.Mg61hxUS0NyDWeaLjQ7otICixTNo.7W', 'Azouaou', 'Benadda', 'test', true,'https///website.com');

INSERT INTO "Image"("fileName", "filePath", "mimeType", "size", "type")

VALUES
    ('test1', 'test1', 'jpg', 3754, 'bookmark'),
    ('test2', 'test2', 'jpg', 3754, 'avatar');
  
INSERT INTO "Bookmark"("name", "description", "link", "userId", "toolId", "imgId")
  ('karim@gmail.com', '$2b$12$.KhX3EPgaayYMTlr1dXcU.taGSltka4pgzmwle5NHOIcbvYWj9roC', 'Karim', 'Romdhane', 'karim', 1, 'https///website.com', true),
  ('enzo@gmail.com', '$2b$12$D5ko8ixaxXCNR.qubJUiHuHnNjyY2y2t85HnieYNuBow2Q.AE6fAO', 'Enzo', 'Bacqueyrisses', 'enzo', 2, 'https///website.com', true),
  ('floriane@test.fr', '$2b$12$9XCXX95b8xPorCrnMn/V0O6d98iGKUMgMO6T7ML7DYNe2c6TdiR3.', 'Floriane', 'Perucchini', 'floriane', null, 'https///website.com', true),
  ('abdel@test.fr', '$2b$12$pJKz7rbXoFdQrLrKmr5p0.lAIfTr91IuqtdH1.Sp2dPW0q8QRtCmy', 'Abdel', 'Karim', 'abdel', 4, 'https///website.com', true),
  ('azouaou@test.fr', '$2b$12$XkLJz9QJ2eikWb4e3WYfLuGkcvpzRaXqZdLPkaxay60oLOFkGNRGq', 'Azouaou', 'Benadda', 'test', 5, 'https///website.com', true);

INSERT INTO "Bookmark"(name, description, link, "imgId", "userId", "toolId")

    VALUES
    ('Favorite1', 'Super favorite 1', 'link1', 1, 1, 2),
    ('Favorite1', 'Super favorite 1', 'link1', 2, 2, 1),
    ('Favorite1', 'Super favorite 1', 'link1', 3, 3, 2),
    ('Favorite1', 'Super favorite 1', 'link1', 3, 4, 2),
    ('Favorite1', 'Super favorite 1', 'link1', 1, 1, 1),
    ('Favorite1', 'Super favorite 1', 'link1', 4, 2, 2);


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


UPDATE "Category"
    SET "tool_id"=1;

UPDATE "Tool"
    SET "category_id"=1;

UPDATE "User"
    SET "imgId"=1;

UPDATE "Image"
    SET "bookmark_id"=1;
       

      




COMMIT;





