/*
  Warnings:

  - Added the required column `hashedPassword` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resetToken` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resetTokenExpiresAt` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salt` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `webAuthnChallenge` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "hashedPassword" TEXT NOT NULL,
ADD COLUMN     "resetToken" TEXT NOT NULL,
ADD COLUMN     "resetTokenExpiresAt" TEXT NOT NULL,
ADD COLUMN     "salt" TEXT NOT NULL,
ADD COLUMN     "webAuthnChallenge" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserCredential" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "publicKey" BYTEA NOT NULL,
    "transports" TEXT,
    "counter" BIGINT NOT NULL,

    CONSTRAINT "UserCredential_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserCredential" ADD CONSTRAINT "UserCredential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
