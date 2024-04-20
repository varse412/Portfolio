/*
  Warnings:

  - You are about to drop the column `linkedinURL` on the `myProfile` table. All the data in the column will be lost.
  - You are about to drop the column `resume` on the `myProfile` table. All the data in the column will be lost.
  - You are about to drop the column `websiteURL` on the `myProfile` table. All the data in the column will be lost.
  - Added the required column `linkedInURL` to the `myProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumeLink` to the `myProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `myProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "myProfile" DROP COLUMN "linkedinURL",
DROP COLUMN "resume",
DROP COLUMN "websiteURL",
ADD COLUMN     "linkedInURL" TEXT NOT NULL,
ADD COLUMN     "resumeLink" TEXT NOT NULL,
ADD COLUMN     "website" TEXT NOT NULL;
