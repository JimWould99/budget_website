/*
  Warnings:

  - You are about to drop the column `data` on the `DataSnapshot` table. All the data in the column will be lost.
  - Added the required column `amoundSpent` to the `DataSnapshot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amountBudgeted` to the `DataSnapshot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DataSnapshot" DROP COLUMN "data",
ADD COLUMN     "amoundSpent" INTEGER NOT NULL,
ADD COLUMN     "amountBudgeted" INTEGER NOT NULL;
