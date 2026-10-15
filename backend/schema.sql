-- TrainXShiv MySQL Database Schema
CREATE DATABASE IF NOT EXISTS `trainxshiv_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `trainxshiv_db`;

-- Site Settings (Brand, Hero, Announcement, etc.)
CREATE TABLE IF NOT EXISTS `site_settings` (
  `setting_key` VARCHAR(64) PRIMARY KEY,
  `setting_value` JSON NOT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Coaching Programs
CREATE TABLE IF NOT EXISTS `programs` (
  `id` VARCHAR(64) PRIMARY KEY,
  `cat` VARCHAR(100),
  `icon` VARCHAR(50) DEFAULT 'Laptop',
  `title` VARCHAR(255) NOT NULL,
  `tag` TEXT,
  `weeks` VARCHAR(50),
  `level` VARCHAR(50),
  `img` VARCHAR(255),
  `from_price` INT DEFAULT 0,
  `featured` BOOLEAN DEFAULT TRUE,
  `features` JSON,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Pricing & Membership Plans
CREATE TABLE IF NOT EXISTS `plans` (
  `id` VARCHAR(64) PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `price` INT DEFAULT 0,
  `duration` VARCHAR(50),
  `workout` BOOLEAN DEFAULT TRUE,
  `diet` BOOLEAN DEFAULT TRUE,
  `support` VARCHAR(100),
  `tracking` BOOLEAN DEFAULT TRUE,
  `icon` VARCHAR(50) DEFAULT 'Laptop',
  `popular` BOOLEAN DEFAULT FALSE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Paid Diet Plans
CREATE TABLE IF NOT EXISTS `paid_diets` (
  `id` VARCHAR(64) PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `price` INT DEFAULT 0,
  `weeks` VARCHAR(50),
  `popular` BOOLEAN DEFAULT FALSE,
  `items` JSON
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Trainers & Coaches
CREATE TABLE IF NOT EXISTS `trainers` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `badge` VARCHAR(100),
  `badge_icon` VARCHAR(50) DEFAULT 'Dumbbell',
  `role` VARCHAR(100),
  `tags` JSON,
  `img` VARCHAR(255),
  `bio` TEXT,
  `is_head` BOOLEAN DEFAULT FALSE,
  `socials` JSON
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Before / After Client Transformations
CREATE TABLE IF NOT EXISTS `transforms` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `goal` VARCHAR(100),
  `type` VARCHAR(50) DEFAULT 'fat',
  `result` VARCHAR(50),
  `period` VARCHAR(50),
  `image` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Video Reviews
CREATE TABLE IF NOT EXISTS `video_reviews` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `result` VARCHAR(100),
  `poster` VARCHAR(255),
  `video` VARCHAR(255),
  `youtube` VARCHAR(255) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Testimonials & Quotes
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `rating` INT DEFAULT 5,
  `text` TEXT NOT NULL,
  `img` VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- How It Works Steps
CREATE TABLE IF NOT EXISTS `steps` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `icon` VARCHAR(50) DEFAULT 'Target',
  `t` VARCHAR(100) NOT NULL,
  `d` TEXT NOT NULL,
  `step_order` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Blog Posts & Knowledge Base
CREATE TABLE IF NOT EXISTS `blogs` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `cat` VARCHAR(50) DEFAULT 'Nutrition',
  `title` VARCHAR(255) NOT NULL,
  `read_time` VARCHAR(50) DEFAULT '4 min',
  `published` BOOLEAN DEFAULT TRUE,
  `date` VARCHAR(50) DEFAULT 'Oct 2026',
  `body` JSON,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Frequently Asked Questions
CREATE TABLE IF NOT EXISTS `faqs` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `q` TEXT NOT NULL,
  `a` TEXT NOT NULL,
  `faq_order` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Client Consultation Leads & Inquiries
CREATE TABLE IF NOT EXISTS `inquiries` (
  `id` VARCHAR(64) PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(50),
  `email` VARCHAR(100),
  `goal` VARCHAR(100),
  `plan` VARCHAR(100),
  `notes` TEXT,
  `status` VARCHAR(50) DEFAULT 'New',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

