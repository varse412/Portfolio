/*
  Warnings:

  - Added the required column `stackItems` to the `skills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stackName` to the `skills` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "skills" ADD COLUMN     "stackItems" TEXT NOT NULL,
ADD COLUMN     "stackName" TEXT NOT NULL;
