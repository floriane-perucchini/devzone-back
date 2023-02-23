/*
  Warnings:

  - You are about to drop the `bookmark` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tool` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bookmark" DROP CONSTRAINT "bookmark_tool_id_fkey";

-- DropForeignKey
ALTER TABLE "bookmark" DROP CONSTRAINT "bookmark_user_id_fkey";

-- DropTable
DROP TABLE "bookmark";

-- DropTable
DROP TABLE "tool";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "Tool" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "description" TEXT,
    "userId" INTEGER,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "username" TEXT NOT NULL,
    "avatar" TEXT,
    "toolId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookmark" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT,
    "linkImg" TEXT,
    "userId" INTEGER,
    "toolId" INTEGER,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToolsOnUsers" (
    "userId" INTEGER NOT NULL,
    "toolId" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "ToolsOnUsers_pkey" PRIMARY KEY ("userId","toolId")
);

-- CreateIndex
CREATE INDEX "Tool_logo_idx" ON "Tool"("logo");

-- CreateIndex
CREATE INDEX "Tool_name_idx" ON "Tool"("name");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_firstname_idx" ON "User"("firstname");

-- CreateIndex
CREATE INDEX "User_lastname_idx" ON "User"("lastname");

-- CreateIndex
CREATE INDEX "Bookmark_link_idx" ON "Bookmark"("link");

-- CreateIndex
CREATE INDEX "Bookmark_linkImg_idx" ON "Bookmark"("linkImg");

-- CreateIndex
CREATE INDEX "Bookmark_name_idx" ON "Bookmark"("name");

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "bookmark_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ToolsOnUsers" ADD CONSTRAINT "ToolsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolsOnUsers" ADD CONSTRAINT "ToolsOnUsers_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
