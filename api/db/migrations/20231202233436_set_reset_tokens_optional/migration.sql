/*
  Warnings:

  - A unique constraint covering the columns `[webAuthnChallenge]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "resetToken" DROP NOT NULL,
ALTER COLUMN "resetTokenExpiresAt" DROP NOT NULL,
ALTER COLUMN "webAuthnChallenge" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_webAuthnChallenge_key" ON "User"("webAuthnChallenge");
