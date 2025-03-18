/*
  Warnings:

  - Added the required column `nationality` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `searchType` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "nationality" TEXT NOT NULL,
ADD COLUMN     "searchType" TEXT NOT NULL;
