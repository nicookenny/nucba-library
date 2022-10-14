/*
  Warnings:

  - Added the required column `bookId` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cost` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDate` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Sell` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookId` to the `Sell` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Sell` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Sell` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CLIENT');

-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('PENDING', 'RETURNED', 'NOT_RETURNED');

-- AlterTable
ALTER TABLE "Loan" ADD COLUMN     "bookId" INTEGER NOT NULL,
ADD COLUMN     "cost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "LoanStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sell" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "bookId" INTEGER NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sell" ADD CONSTRAINT "Sell_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sell" ADD CONSTRAINT "Sell_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
