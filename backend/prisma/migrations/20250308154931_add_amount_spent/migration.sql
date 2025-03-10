/*
  Warnings:

  - You are about to drop the column `amoundSpent` on the `DataSnapshot` table. All the data in the column will be lost.
  - Added the required column `amountSpent` to the `DataSnapshot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DataSnapshot" DROP COLUMN "amoundSpent",
ADD COLUMN     "amountSpent" INTEGER NOT NULL;
