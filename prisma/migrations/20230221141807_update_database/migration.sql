-- RenameForeignKey
ALTER TABLE "bookmark" RENAME CONSTRAINT "bookmark_tool_id_fkey" TO "favorite_tool_id_fkey";

-- RenameForeignKey
ALTER TABLE "bookmark" RENAME CONSTRAINT "bookmark_user_id_fkey" TO "favorite_user_id_fkey";
