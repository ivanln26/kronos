/*
  Warnings:

  - The values [cancelled] on the enum `lecture_state` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `lecture` MODIFY `state` ENUM('scheduled', 'ongoing', 'canceled', 'delayed') NOT NULL;
