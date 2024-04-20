/*
  Warnings:

  - You are about to drop the column `resumeURL` on the `myProfile` table. All the data in the column will be lost.
  - Added the required column `resume` to the `myProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "myProfile" DROP COLUMN "resumeURL",
ADD COLUMN     "resume" TEXT NOT NULL;
