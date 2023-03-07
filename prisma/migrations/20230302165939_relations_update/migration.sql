-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_imgId_fkey";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
