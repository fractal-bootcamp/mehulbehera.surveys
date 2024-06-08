/*
  Warnings:

  - You are about to drop the column `surveyId` on the `Response` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_surveyId_fkey";

-- AlterTable
ALTER TABLE "Response" DROP COLUMN "surveyId";
