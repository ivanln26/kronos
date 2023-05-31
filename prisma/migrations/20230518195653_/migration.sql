-- CreateTable
CREATE TABLE `attendance` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `student_id` BIGINT UNSIGNED NOT NULL,
    `lecture_id` BIGINT UNSIGNED NOT NULL,
    `is_present` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `attendance_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classroom` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL,

    UNIQUE INDEX `classroom_id_key`(`id`),
    UNIQUE INDEX `classroom_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(120) NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,

    UNIQUE INDEX `course_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enrollment` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `student_id` BIGINT UNSIGNED NOT NULL,
    `course_id` BIGINT UNSIGNED NOT NULL,

    UNIQUE INDEX `enrollment_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lecture` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `schedule_id` BIGINT UNSIGNED NOT NULL,
    `state` ENUM('scheduled', 'ongoing', 'cancelled', 'delayed') NOT NULL,
    `date` DATE NOT NULL,

    UNIQUE INDEX `lecture_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schedule` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `course_id` BIGINT UNSIGNED NOT NULL,
    `classroom_id` BIGINT UNSIGNED NOT NULL,
    `professor_id` BIGINT UNSIGNED NOT NULL,
    `weekday` ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday') NOT NULL,
    `modality` ENUM('f2f', 'virtual', 'hybrid') NOT NULL DEFAULT 'f2f',
    `type` ENUM('theoretical', 'practical', 'laboratory') NOT NULL,
    `start_time` TIME(0) NOT NULL,
    `end_time` TIME(0) NOT NULL,

    UNIQUE INDEX `schedule_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `ucc` VARCHAR(8) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `last_name` VARCHAR(120) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `role` ENUM('admin', 'student', 'professor') NOT NULL,

    UNIQUE INDEX `user_id_key`(`id`),
    UNIQUE INDEX `user_ucc_key`(`ucc`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;