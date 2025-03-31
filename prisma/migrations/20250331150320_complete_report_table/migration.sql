/*
  Warnings:

  - You are about to drop the column `data` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `searchData` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `searchType` on the `Report` table. All the data in the column will be lost.
  - Added the required column `criminal_records` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_identity_matched` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `news_media` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peps_verification` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `risk_score` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sanctions_lists` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `search_data` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `search_type` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report" DROP COLUMN "data",
DROP COLUMN "searchData",
DROP COLUMN "searchType",
ADD COLUMN     "criminal_records" BOOLEAN NOT NULL,
ADD COLUMN     "is_identity_matched" BOOLEAN NOT NULL,
ADD COLUMN     "news_media" BOOLEAN NOT NULL,
ADD COLUMN     "peps_verification" BOOLEAN NOT NULL,
ADD COLUMN     "risk_score" INTEGER NOT NULL,
ADD COLUMN     "sanctions_lists" JSONB NOT NULL,
ADD COLUMN     "search_data" TEXT NOT NULL,
ADD COLUMN     "search_type" TEXT NOT NULL;
