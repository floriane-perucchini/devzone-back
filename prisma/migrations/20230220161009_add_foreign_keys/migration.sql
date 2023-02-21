-- CreateTable
CREATE TABLE "bookmark" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT,
    "link_img" TEXT,
    "user_id" INTEGER,
    "tool_id" INTEGER,

    CONSTRAINT "bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tool" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "description" TEXT,

    CONSTRAINT "tool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "pseudo" TEXT NOT NULL,
    "avatar" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bookmark" ADD CONSTRAINT "bookmark_tool_id_fkey" FOREIGN KEY ("tool_id") REFERENCES "tool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bookmark" ADD CONSTRAINT "bookmark_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
