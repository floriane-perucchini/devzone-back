BEGIN;

CREATE DOMAIN mail AS text CHECK(VALUE ~ '(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}$');

CREATE TABLE IF NOT EXISTS public."User"
(
    id integer NOT NULL DEFAULT 'nextval('"User_id_seq"'::regclass)',
    email text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    firstname text COLLATE pg_catalog."default",
    lastname text COLLATE pg_catalog."default",
    username text COLLATE pg_catalog."default" NOT NULL,
    avatar text COLLATE pg_catalog."default",
    CONSTRAINT "User_pkey" PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS public."Tool"
(
    id integer NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    logo text COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    CONSTRAINT "Tool_pkey" PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS public."Bookmark"
(
    id integer NOT NULL DEFAULT 'nextval('"Bookmark_id_seq"'::regclass)',
    name text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    link text COLLATE pg_catalog."default",
    "linkImg" text COLLATE pg_catalog."default",
    "userId" integer,
    "toolId" integer,
    CONSTRAINT "Bookmark_pkey" PRIMARY KEY (id),
    CONSTRAINT "bookmark_toolId_fkey" FOREIGN KEY ("toolId")
        REFERENCES public."Tool" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "bookmark_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES public."User" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


CREATE TABLE IF NOT EXISTS public."ToolsOnUsers"
(
    "userId" integer NOT NULL,
    "toolId" integer NOT NULL,
    created_at timestamp(6) with time zone NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
    updated_at timestamp(6) with time zone,
    CONSTRAINT "ToolsOnUsers_pkey" PRIMARY KEY ("userId", "toolId"),
    CONSTRAINT "ToolsOnUsers_toolId_fkey" FOREIGN KEY ("toolId")
        REFERENCES public."Tool" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT "ToolsOnUsers_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES public."User" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);





COMMIT;
