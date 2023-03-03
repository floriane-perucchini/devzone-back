-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_userId_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_imgId_fkey" FOREIGN KEY ("imgId") REFERENCES "Image"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
