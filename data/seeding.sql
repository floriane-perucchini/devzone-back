BEGIN;

INSERT INTO public."tool"(
	 name, logo, description)
	VALUES ("Github", "test", "git"),
	VALUES ("Stackoverflow", "test2", "stack"),
	VALUES ("MDN", "test3", "Mozilla");


INSERT INTO public."user"(
	 email, password, firstname, lastname, username, avatar,)
	VALUES 
  ("test@test.fr","ddsqdlsj" , "test1","testbis", "toto", "test"),
  (test@test.fr, "dsqhdk", "test2", "test2", "test", "test"),
  (test@test.fr, "dsdffqqsd", "test3", "test3", "test", "test"),
  (test@test.fr, "dsdffqqsd", "test3", "test3", "test", "test"),
  (test@test.fr, "dsdffqqsd", "test3", "test3", "test", "test");



COMMIT;

 



