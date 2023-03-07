BEGIN;

CREATE DOMAIN valid_mail AS text CHECK (value ~ '^([a-zA-Z0-9]+[-_.]?)*[a-zA-Z0-9]+@[a-zA-Z0-9]+[-]?[a-zA-Z0-9]+.[a-z]{2,}$');

CREATE DOMAIN valid_password AS text CHECK (value ~ '^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$');

ALTER TABLE "User"
 ALTER COLUMN email SET DATA TYPE valid_mail;
 

ALTER TABLE "User"
 ALTER COLUMN password SET DATA TYPE valid_password;

 
COMMIT;