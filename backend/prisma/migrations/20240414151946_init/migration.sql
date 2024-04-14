-- CreateTable
CREATE TABLE "myProfile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "githubURL" TEXT NOT NULL,
    "linkedinURL" TEXT NOT NULL,
    "websiteURL" TEXT NOT NULL,
    "resumeURL" TEXT NOT NULL,
    "resume" TEXT NOT NULL,

    CONSTRAINT "myProfile_pkey" PRIMARY KEY ("id")
);
