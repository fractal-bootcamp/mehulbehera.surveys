/*
  Warnings:

  - A unique constraint covering the columns `[text]` on the table `Question` will be added. If there are existing duplicate values, this will fail.
  - Made the column `surveyId` on table `Question` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_surveyId_fkey";

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "surveyId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Question_text_key" ON "Question"("text");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
