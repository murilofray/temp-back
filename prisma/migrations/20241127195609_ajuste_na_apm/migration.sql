/*
  Warnings:

  - A unique constraint covering the columns `[apm_id]` on the table `escola` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `escola_apm_id_key` ON `escola`(`apm_id`);
