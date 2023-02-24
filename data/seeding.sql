BEGIN;

INSERT INTO public."Tool"("name", "logo", "description")
	 
	VALUES 
	 ("Github", "test", "git"),
	 ("Stackoverflow", "test2", "stack"),
	 ("MDN", "test3", "Mozilla");


INSERT INTO public."User"("email", "password", "firstname", "lastname", "username", "avatar")
	 
	VALUES 
  ("test@test.fr", "ddsqdlsj", "test1", "testbis", "toto", "test1"),
  ("test@test.fr", "dsqhdk", "test2", "test2", "test", "test10"),
  ("test@test.fr", "dsdffqqsd", "test3", "test3", "test", "test15"),
  ("test@test.fr", "dsdffqqsd", "test3", "test3", "test", "test5"),
  ("test@test.fr", "dsdffqqsd", "test3", "test3", "test", "test8");



COMMIT;

 



