-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Article" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "content" TEXT,
    "image" TEXT,
    "colleges" INTEGER NOT NULL DEFAULT 0,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "popular" BOOLEAN NOT NULL DEFAULT false,
    "postType" TEXT,
    "examCategory" TEXT,
    "genericGroup" BOOLEAN NOT NULL DEFAULT false,
    "exam" TEXT,
    "secondary" TEXT,
    "subjects" TEXT,
    "postAs" TEXT NOT NULL DEFAULT 'Me',
    "userEmail" TEXT,
    "location" TEXT,
    "specifyPostDate" BOOLEAN NOT NULL DEFAULT false,
    "postDate" DATETIME,
    "noIndex" BOOLEAN NOT NULL DEFAULT false,
    "sendToSEO" BOOLEAN NOT NULL DEFAULT false,
    "isNews" BOOLEAN NOT NULL DEFAULT false,
    "excerpt" TEXT,
    "faqTitle" TEXT,
    "metaDescription" TEXT,
    "featuredContentType" TEXT,
    "featuredImage" TEXT,
    "featuredVideo" TEXT,
    "caption" TEXT,
    "linkReplacement" TEXT,
    "introductoryText" TEXT,
    "seoMetaTitle" TEXT,
    "slug" TEXT,
    "canonical" TEXT,
    "redirect" TEXT,
    "keywords" TEXT,
    "subscriptionBox" BOOLEAN NOT NULL DEFAULT false,
    "subscriptionBoxDetails" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Article" ("category", "colleges", "content", "createdAt", "featured", "id", "image", "popular", "title", "updatedAt") SELECT "category", "colleges", "content", "createdAt", "featured", "id", "image", "popular", "title", "updatedAt" FROM "Article";
DROP TABLE "Article";
ALTER TABLE "new_Article" RENAME TO "Article";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
