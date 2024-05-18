-- CreateTable
CREATE TABLE "myCertificate" (
    "id" TEXT NOT NULL,
    "nameOfCertificate" TEXT NOT NULL,
    "certificateLinkToDownload" TEXT NOT NULL,
    "imageCertificate" TEXT NOT NULL,

    CONSTRAINT "myCertificate_pkey" PRIMARY KEY ("id")
);
