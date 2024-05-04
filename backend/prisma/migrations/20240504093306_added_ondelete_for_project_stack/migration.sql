-- DropForeignKey
ALTER TABLE "projectStack" DROP CONSTRAINT "projectStack_projectId_fkey";

-- AddForeignKey
ALTER TABLE "projectStack" ADD CONSTRAINT "projectStack_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
