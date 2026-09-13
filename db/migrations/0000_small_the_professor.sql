CREATE TABLE `account` (
	`id` varchar(36) NOT NULL,
	`account_id` varchar(255) NOT NULL,
	`provider_id` varchar(255) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` timestamp,
	`refresh_token_expires_at` timestamp,
	`scope` varchar(500),
	`password` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `account_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `audit_logs` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36),
	`action` varchar(120) NOT NULL,
	`entity_type` varchar(80) NOT NULL,
	`entity_id` varchar(36),
	`metadata` json,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `audit_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `coverage_areas` (
	`id` varchar(36) NOT NULL,
	`province` varchar(120) NOT NULL,
	`city` varchar(120) NOT NULL,
	`district` varchar(120) NOT NULL,
	`postal_code` varchar(12) NOT NULL,
	`status` enum('AVAILABLE','COMING_SOON','UNAVAILABLE') NOT NULL,
	`latitude` decimal(10,7),
	`longitude` decimal(10,7),
	`notes` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `coverage_areas_id` PRIMARY KEY(`id`),
	CONSTRAINT `coverage_location_unique` UNIQUE(`province`,`city`,`district`,`postal_code`)
);
--> statement-breakpoint
CREATE TABLE `coverage_checks` (
	`id` varchar(36) NOT NULL,
	`address` varchar(255) NOT NULL,
	`province` varchar(120) NOT NULL,
	`city` varchar(120) NOT NULL,
	`district` varchar(120) NOT NULL,
	`postal_code` varchar(12) NOT NULL,
	`property_type` enum('RESIDENTIAL','BUSINESS') NOT NULL,
	`result_status` enum('AVAILABLE','COMING_SOON','UNAVAILABLE') NOT NULL,
	`coverage_area_id` varchar(36),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `coverage_checks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `faqs` (
	`id` varchar(36) NOT NULL,
	`question` varchar(255) NOT NULL,
	`answer` text NOT NULL,
	`sort_order` int NOT NULL DEFAULT 0,
	`is_published` boolean NOT NULL DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `faqs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `internet_plans` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(120) NOT NULL,
	`speed_mbps` int NOT NULL,
	`price` decimal(12,2) NOT NULL,
	`promo_price` decimal(12,2),
	`promo_label` varchar(120),
	`promo_start_at` timestamp,
	`promo_end_at` timestamp,
	`description` text NOT NULL,
	`device_min` int NOT NULL,
	`device_max` int,
	`benefits` json NOT NULL,
	`is_popular` boolean NOT NULL DEFAULT false,
	`is_active` boolean NOT NULL DEFAULT true,
	`is_archived` boolean NOT NULL DEFAULT false,
	`sort_order` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `internet_plans_id` PRIMARY KEY(`id`),
	CONSTRAINT `internet_plans_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` varchar(36) NOT NULL,
	`name` varchar(120) NOT NULL,
	`phone` varchar(32) NOT NULL,
	`email` varchar(255),
	`address` varchar(255) NOT NULL,
	`province` varchar(120) NOT NULL,
	`city` varchar(120) NOT NULL,
	`district` varchar(120) NOT NULL,
	`postal_code` varchar(12) NOT NULL,
	`property_type` enum('RESIDENTIAL','BUSINESS') NOT NULL,
	`plan_id` varchar(36),
	`coverage_area_id` varchar(36),
	`source` enum('HOMEPAGE','COVERAGE_CHECKER','PLAN_SELECTION','REGISTRATION','WHATSAPP','CONTACT_FORM') NOT NULL,
	`status` enum('NEW','CONTACTED','SURVEY','INSTALLATION','ACTIVE','LOST') NOT NULL DEFAULT 'NEW',
	`notes` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media_assets` (
	`id` varchar(36) NOT NULL,
	`filename` varchar(255) NOT NULL,
	`storage_key` varchar(500) NOT NULL,
	`url` varchar(2048) NOT NULL,
	`mime_type` varchar(100) NOT NULL,
	`size` int NOT NULL,
	`width` int,
	`height` int,
	`alt_text` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `media_assets_id` PRIMARY KEY(`id`),
	CONSTRAINT `media_assets_storage_key_unique` UNIQUE(`storage_key`)
);
--> statement-breakpoint
CREATE TABLE `page_sections` (
	`id` varchar(36) NOT NULL,
	`page_id` varchar(36) NOT NULL,
	`section_key` varchar(80) NOT NULL,
	`section_type` varchar(80) NOT NULL,
	`content` json NOT NULL,
	`sort_order` int NOT NULL DEFAULT 0,
	`is_visible` boolean NOT NULL DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `page_sections_id` PRIMARY KEY(`id`),
	CONSTRAINT `page_section_key_unique` UNIQUE(`page_id`,`section_key`)
);
--> statement-breakpoint
CREATE TABLE `pages` (
	`id` varchar(36) NOT NULL,
	`slug` varchar(150) NOT NULL,
	`title` varchar(180) NOT NULL,
	`status` enum('DRAFT','PUBLISHED') NOT NULL DEFAULT 'DRAFT',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pages_id` PRIMARY KEY(`id`),
	CONSTRAINT `pages_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `seo_metadata` (
	`id` varchar(36) NOT NULL,
	`page_id` varchar(36) NOT NULL,
	`meta_title` varchar(180),
	`meta_description` varchar(320),
	`canonical_url` varchar(2048),
	`og_title` varchar(180),
	`og_description` varchar(320),
	`og_image_id` varchar(36),
	`no_index` boolean NOT NULL DEFAULT false,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `seo_metadata_id` PRIMARY KEY(`id`),
	CONSTRAINT `seo_metadata_page_id_unique` UNIQUE(`page_id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` varchar(36) NOT NULL,
	`expires_at` timestamp NOT NULL,
	`token` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`ip_address` varchar(64),
	`user_agent` varchar(512),
	`user_id` varchar(36) NOT NULL,
	CONSTRAINT `session_id` PRIMARY KEY(`id`),
	CONSTRAINT `session_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `site_settings` (
	`id` varchar(36) NOT NULL,
	`company_name` varchar(160) NOT NULL,
	`brand_name` varchar(160) NOT NULL,
	`logo_id` varchar(36),
	`favicon_id` varchar(36),
	`whatsapp_number` varchar(32) NOT NULL,
	`phone` varchar(32),
	`email` varchar(255),
	`business_address` text,
	`maps_url` varchar(2048),
	`operating_hours` varchar(255),
	`instagram` varchar(2048),
	`facebook` varchar(2048),
	`tiktok` varchar(2048),
	`youtube` varchar(2048),
	`default_seo_title` varchar(180) NOT NULL,
	`default_seo_description` varchar(320) NOT NULL,
	`default_og_image_id` varchar(36),
	`footer_copy` text,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_settings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` varchar(36) NOT NULL,
	`name` varchar(120) NOT NULL,
	`location` varchar(160),
	`quote` text NOT NULL,
	`avatar_id` varchar(36),
	`rating` int,
	`sort_order` int NOT NULL DEFAULT 0,
	`is_published` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `testimonials_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(36) NOT NULL,
	`name` varchar(120) NOT NULL,
	`email` varchar(255) NOT NULL,
	`email_verified` boolean NOT NULL DEFAULT false,
	`image` varchar(2048),
	`role` enum('SUPER_ADMIN','ADMIN','EDITOR','SALES') NOT NULL DEFAULT 'ADMIN',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `verification` (
	`id` varchar(36) NOT NULL,
	`identifier` varchar(255) NOT NULL,
	`value` text NOT NULL,
	`expires_at` timestamp NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `verification_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `audit_logs` ADD CONSTRAINT `audit_logs_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `coverage_checks` ADD CONSTRAINT `coverage_checks_coverage_area_id_coverage_areas_id_fk` FOREIGN KEY (`coverage_area_id`) REFERENCES `coverage_areas`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `leads` ADD CONSTRAINT `leads_plan_id_internet_plans_id_fk` FOREIGN KEY (`plan_id`) REFERENCES `internet_plans`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `leads` ADD CONSTRAINT `leads_coverage_area_id_coverage_areas_id_fk` FOREIGN KEY (`coverage_area_id`) REFERENCES `coverage_areas`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `page_sections` ADD CONSTRAINT `page_sections_page_id_pages_id_fk` FOREIGN KEY (`page_id`) REFERENCES `pages`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `seo_metadata` ADD CONSTRAINT `seo_metadata_page_id_pages_id_fk` FOREIGN KEY (`page_id`) REFERENCES `pages`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `seo_metadata` ADD CONSTRAINT `seo_metadata_og_image_id_media_assets_id_fk` FOREIGN KEY (`og_image_id`) REFERENCES `media_assets`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `site_settings` ADD CONSTRAINT `site_settings_logo_id_media_assets_id_fk` FOREIGN KEY (`logo_id`) REFERENCES `media_assets`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `site_settings` ADD CONSTRAINT `site_settings_favicon_id_media_assets_id_fk` FOREIGN KEY (`favicon_id`) REFERENCES `media_assets`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `site_settings` ADD CONSTRAINT `site_settings_default_og_image_id_media_assets_id_fk` FOREIGN KEY (`default_og_image_id`) REFERENCES `media_assets`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `testimonials` ADD CONSTRAINT `testimonials_avatar_id_media_assets_id_fk` FOREIGN KEY (`avatar_id`) REFERENCES `media_assets`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `account_user_idx` ON `account` (`user_id`);--> statement-breakpoint
CREATE INDEX `audit_created_idx` ON `audit_logs` (`created_at`);--> statement-breakpoint
CREATE INDEX `coverage_search_idx` ON `coverage_areas` (`city`,`district`,`status`);--> statement-breakpoint
CREATE INDEX `coverage_checks_created_idx` ON `coverage_checks` (`created_at`);--> statement-breakpoint
CREATE INDEX `faq_listing_idx` ON `faqs` (`is_published`,`sort_order`);--> statement-breakpoint
CREATE INDEX `plan_listing_idx` ON `internet_plans` (`is_active`,`is_archived`,`sort_order`);--> statement-breakpoint
CREATE INDEX `lead_status_created_idx` ON `leads` (`status`,`created_at`);--> statement-breakpoint
CREATE INDEX `lead_plan_idx` ON `leads` (`plan_id`);--> statement-breakpoint
CREATE INDEX `session_user_idx` ON `session` (`user_id`);--> statement-breakpoint
CREATE INDEX `verification_identifier_idx` ON `verification` (`identifier`);