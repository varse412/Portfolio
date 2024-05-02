/*
  Warnings:

  - Added the required column `demoVideo` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `liveURL` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project" ADD COLUMN     "demoVideo" TEXT NOT NULL,
ADD COLUMN     "liveURL" TEXT NOT NULL;
