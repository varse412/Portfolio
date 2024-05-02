-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "developmentType" TEXT NOT NULL,
    "projectDescription" TEXT NOT NULL,
    "githubURL" TEXT NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projectStack" (
    "id" SERIAL NOT NULL,
    "projectId" TEXT,

    CONSTRAINT "projectStack_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "projectStack" ADD CONSTRAINT "projectStack_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
