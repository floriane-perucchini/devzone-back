BEGIN;

CREATE DOMAIN mail AS text CHECK(VALUE ~ '(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}$');
CREATE TABLE "user" (
                      id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                      email mail NOT NULL,
                      password text NOT NULL,
                      firstname text,
                      lastname text,
                      pseudo text NOT NULL,
                      avatar text

);
CREATE TABLE tool (
                      id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                      name text not NULL,
                      logo text,
                      description text
);

CREATE TABLE favorite (
                          id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                          name text NOT NULL,
                          description text,
                          link text,
                          link_img text,
                          user_id int REFERENCES "user" (id),
                          tool_id int  REFERENCES tool (id)
);




COMMIT;
