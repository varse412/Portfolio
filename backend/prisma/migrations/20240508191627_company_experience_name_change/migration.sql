/*
  Warnings:

  - You are about to drop the `companhyExperience` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "companhyExperience";

-- CreateTable
CREATE TABLE "companyExperience" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "companyImage" TEXT NOT NULL,

    CONSTRAINT "companyExperience_pkey" PRIMARY KEY ("id")
);
