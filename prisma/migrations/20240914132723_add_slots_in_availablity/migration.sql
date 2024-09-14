/*
  Warnings:

  - A unique constraint covering the columns `[availabilityId,startTime,endTime]` on the table `Slot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Slot_availabilityId_startTime_endTime_key" ON "Slot"("availabilityId", "startTime", "endTime");
