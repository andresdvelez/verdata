/*
  Warnings:

  - Added the required column `searchData` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "searchData" TEXT NOT NULL;
