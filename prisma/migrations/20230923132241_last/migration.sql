/*
  Warnings:

  - You are about to drop the column `receiverId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `RoomUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `body` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "RoomUser" DROP CONSTRAINT "RoomUser_roomId_fkey";

-- DropForeignKey
ALTER TABLE "RoomUser" DROP CONSTRAINT "RoomUser_userId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "receiverId",
DROP COLUMN "text",
ADD COLUMN     "body" TEXT NOT NULL,
ADD COLUMN     "ownedByCurrentUser" BOOLEAN,
ADD COLUMN     "roomId" TEXT NOT NULL,
ALTER COLUMN "sentAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roomId" TEXT NOT NULL;

-- DropTable
DROP TABLE "RoomUser";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
