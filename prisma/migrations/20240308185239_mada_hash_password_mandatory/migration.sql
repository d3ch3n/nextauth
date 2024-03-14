/*
  Warnings:

  - Made the column `hashPassword` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "hashPassword" SET NOT NULL;
