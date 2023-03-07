-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_imgId_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_imgId_fkey" FOREIGN KEY ("imgId") REFERENCES "Image"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
