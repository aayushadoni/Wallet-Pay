/*
  Warnings:

  - Added the required column `note` to the `p2pTransfer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionNote" AS ENUM ('Food_Dining', 'Entertainment', 'Investment', 'Utilities', 'Transportation', 'P2P');

-- AlterTable
ALTER TABLE "p2pTransfer" ADD COLUMN     "note" "TransactionNote" NOT NULL;
