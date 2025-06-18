/*
  Warnings:

  - A unique constraint covering the columns `[related_identity_id]` on the table `Report` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `related_identity_id` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "related_identity_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SearchedIdentities" (
    "id" TEXT NOT NULL,
    "document" TEXT,
    "name" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "document_type" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SearchedIdentities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InternationalEndpoint" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InternationalEndpoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NationalEndpoint" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NationalEndpoint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SearchedIdentities_document_key" ON "SearchedIdentities"("document");

-- CreateIndex
CREATE UNIQUE INDEX "Report_related_identity_id_key" ON "Report"("related_identity_id");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_related_identity_id_fkey" FOREIGN KEY ("related_identity_id") REFERENCES "SearchedIdentities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
