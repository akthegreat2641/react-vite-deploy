-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `mobile` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `stream` VARCHAR(191) NULL,
    `level` VARCHAR(191) NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'user',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_mobile_key`(`mobile`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `College` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `logo` VARCHAR(191) NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Board` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Article` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `colleges` INTEGER NOT NULL DEFAULT 0,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `popular` BOOLEAN NOT NULL DEFAULT false,
    `postType` VARCHAR(191) NULL,
    `examCategory` VARCHAR(191) NULL,
    `genericGroup` BOOLEAN NOT NULL DEFAULT false,
    `exam` VARCHAR(191) NULL,
    `secondary` VARCHAR(191) NULL,
    `subjects` VARCHAR(191) NULL,
    `postAs` VARCHAR(191) NOT NULL DEFAULT 'Me',
    `userEmail` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `cutOffButtonText` VARCHAR(191) NULL,
    `cutOffButtonLink` VARCHAR(191) NULL,
    `predictButtonText` VARCHAR(191) NULL,
    `predictButtonLink` VARCHAR(191) NULL,
    `specifyPostDate` BOOLEAN NOT NULL DEFAULT false,
    `postDate` DATETIME(3) NULL,
    `noIndex` BOOLEAN NOT NULL DEFAULT false,
    `sendToSEO` BOOLEAN NOT NULL DEFAULT false,
    `isNews` BOOLEAN NOT NULL DEFAULT false,
    `excerpt` VARCHAR(191) NULL,
    `faqTitle` VARCHAR(191) NULL,
    `metaDescription` VARCHAR(191) NULL,
    `featuredContentType` VARCHAR(191) NULL,
    `featuredImage` VARCHAR(191) NULL,
    `featuredVideo` VARCHAR(191) NULL,
    `caption` VARCHAR(191) NULL,
    `linkReplacement` VARCHAR(191) NULL,
    `introductoryText` VARCHAR(191) NULL,
    `seoMetaTitle` VARCHAR(191) NULL,
    `slug` VARCHAR(191) NULL,
    `canonical` VARCHAR(191) NULL,
    `redirect` VARCHAR(191) NULL,
    `keywords` VARCHAR(191) NULL,
    `subscriptionBox` BOOLEAN NOT NULL DEFAULT false,
    `subscriptionBoxDetails` VARCHAR(191) NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `authorId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArticleSection` (
    `id` VARCHAR(191) NOT NULL,
    `articleId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Scholarship` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `News` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NULL,
    `author` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `published` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exam` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Testimonial` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `rating` INTEGER NOT NULL DEFAULT 5,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stat` (
    `id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NULL,
    `featured` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `City` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CollegePage` (
    `id` VARCHAR(191) NOT NULL,
    `collegeId` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `headerLogo` VARCHAR(191) NULL,
    `headerBgImage` VARCHAR(191) NULL,
    `brochureUrl` VARCHAR(191) NULL,
    `publishedAt` DATETIME(3) NULL,
    `location` VARCHAR(191) NULL,
    `authorId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `CollegePage_collegeId_key`(`collegeId`),
    UNIQUE INDEX `CollegePage_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CollegePageSection` (
    `id` VARCHAR(191) NOT NULL,
    `collegePageId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `type` ENUM('INFO', 'CUTOFF', 'COURSES', 'ADMISSION', 'REVIEWS', 'PLACEMENTS', 'RESULT', 'INFRASTRUCTURE', 'GALLERY', 'SCHOLARSHIP', 'RANKING') NOT NULL DEFAULT 'INFO',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CollegeFaq` (
    `id` VARCHAR(191) NOT NULL,
    `collegePageId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Page` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `headerTitle` VARCHAR(191) NULL,
    `headerLogo` VARCHAR(191) NULL,
    `headerBgImage` VARCHAR(191) NULL,
    `publishDate` DATETIME(3) NULL,
    `description` VARCHAR(191) NULL,
    `locationLabel` VARCHAR(191) NULL,
    `applicationDate` VARCHAR(191) NULL,
    `examDate` VARCHAR(191) NULL,
    `resultDate` VARCHAR(191) NULL,
    `examLevel` VARCHAR(191) NULL,
    `examMode` VARCHAR(191) NULL,
    `headerBtn1Text` VARCHAR(191) NULL,
    `headerBtn1Link` VARCHAR(191) NULL,
    `headerBtn2Text` VARCHAR(191) NULL,
    `headerBtn2Link` VARCHAR(191) NULL,
    `showBtn1` BOOLEAN NOT NULL DEFAULT true,
    `showBtn2` BOOLEAN NOT NULL DEFAULT true,
    `showHeaderLogo` BOOLEAN NOT NULL DEFAULT true,
    `category` VARCHAR(191) NULL,
    `courseDuration` VARCHAR(191) NULL,
    `avgFees` VARCHAR(191) NULL,
    `branch` VARCHAR(191) NULL,
    `level` VARCHAR(191) NULL,
    `boardType` VARCHAR(191) NULL,
    `program` VARCHAR(191) NULL,
    `careerType` VARCHAR(191) NULL,
    `state` VARCHAR(191) NULL,
    `degree` VARCHAR(191) NULL,
    `programType` VARCHAR(191) NULL,
    `collegeType` VARCHAR(191) NULL,
    `courseType` VARCHAR(191) NULL,
    `instituteType` VARCHAR(191) NULL,
    `examAccepted` VARCHAR(191) NULL,
    `genderAccepted` VARCHAR(191) NULL,
    `totalFees` VARCHAR(191) NULL,
    `cdRank` INTEGER NULL,
    `placementAverage` INTEGER NULL,
    `placementHighest` INTEGER NULL,
    `totalFeesVal` INTEGER NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `popular` BOOLEAN NOT NULL DEFAULT false,
    `cardImage` VARCHAR(191) NULL,
    `seoMetaTitle` VARCHAR(191) NULL,
    `metaDescription` VARCHAR(191) NULL,
    `authorId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Page_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PageSection` (
    `id` VARCHAR(191) NOT NULL,
    `pageId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `type` VARCHAR(191) NOT NULL DEFAULT 'INFO',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PageFaq` (
    `id` VARCHAR(191) NOT NULL,
    `pageId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Category_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Author` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `designation` VARCHAR(191) NULL,
    `facebook` VARCHAR(191) NULL,
    `twitter` VARCHAR(191) NULL,
    `linkedin` VARCHAR(191) NULL,
    `instagram` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CareerType` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `CareerType_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SitemapUrl` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `lastModified` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SitemapUrl_url_key`(`url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FooterConfig` (
    `id` VARCHAR(191) NOT NULL DEFAULT 'footer',
    `logoUrl` VARCHAR(191) NULL,
    `aboutText` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `facebook` VARCHAR(191) NULL,
    `twitter` VARCHAR(191) NULL,
    `linkedin` VARCHAR(191) NULL,
    `instagram` VARCHAR(191) NULL,
    `youtube` VARCHAR(191) NULL,
    `section1Title` VARCHAR(191) NULL DEFAULT 'Quick Links',
    `section1Links` VARCHAR(191) NULL,
    `section2Title` VARCHAR(191) NULL DEFAULT 'Explore',
    `section2Links` VARCHAR(191) NULL,
    `section3Title` VARCHAR(191) NULL DEFAULT 'Support',
    `section3Links` VARCHAR(191) NULL,
    `copyrightText` VARCHAR(191) NULL DEFAULT '┬⌐ 2025 CollegewebCU. All Rights Reserved.',
    `privacyPolicy` VARCHAR(191) NULL,
    `termsConditions` VARCHAR(191) NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AdConfig` (
    `id` VARCHAR(191) NOT NULL DEFAULT 'ads',
    `autoAds` VARCHAR(191) NULL,
    `sidebarAd` VARCHAR(191) NULL,
    `bannerAd` VARCHAR(191) NULL,
    `isEnabled` BOOLEAN NOT NULL DEFAULT true,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Author`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArticleSection` ADD CONSTRAINT `ArticleSection_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CollegePage` ADD CONSTRAINT `CollegePage_collegeId_fkey` FOREIGN KEY (`collegeId`) REFERENCES `College`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CollegePage` ADD CONSTRAINT `CollegePage_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Author`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CollegePageSection` ADD CONSTRAINT `CollegePageSection_collegePageId_fkey` FOREIGN KEY (`collegePageId`) REFERENCES `CollegePage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CollegeFaq` ADD CONSTRAINT `CollegeFaq_collegePageId_fkey` FOREIGN KEY (`collegePageId`) REFERENCES `CollegePage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Page` ADD CONSTRAINT `Page_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Author`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PageSection` ADD CONSTRAINT `PageSection_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PageFaq` ADD CONSTRAINT `PageFaq_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

