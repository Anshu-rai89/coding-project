/*
  Warnings:

  - Added the required column `dayEndTime` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayStartTime` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slotDuration` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeFormat` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeZone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dayEndTime" TEXT NOT NULL,
ADD COLUMN     "dayStartTime" TEXT NOT NULL,
ADD COLUMN     "slotDuration" INTEGER NOT NULL,
ADD COLUMN     "timeFormat" TEXT NOT NULL,
ADD COLUMN     "timeZone" TEXT NOT NULL;
