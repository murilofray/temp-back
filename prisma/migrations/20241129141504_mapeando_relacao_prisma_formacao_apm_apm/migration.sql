-- AddForeignKey
ALTER TABLE `apms` ADD CONSTRAINT `apms_apm_id_fkey` FOREIGN KEY (`apm_id`) REFERENCES `apm`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
