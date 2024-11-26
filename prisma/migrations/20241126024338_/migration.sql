/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `servidor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `servidor_email_key` ON `servidor`(`email`);
