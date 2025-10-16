/*
  Warnings:

  - Made the column `domainId` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "public"."Post_projectUrl_key";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "projectUrl" DROP NOT NULL,
ALTER COLUMN "domainId" SET NOT NULL;
