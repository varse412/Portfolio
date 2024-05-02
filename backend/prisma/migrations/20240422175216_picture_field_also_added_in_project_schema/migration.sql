/*
  Warnings:

  - Added the required column `picture` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project" ADD COLUMN     "picture" TEXT NOT NULL;
