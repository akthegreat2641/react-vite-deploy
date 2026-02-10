/*
  Warnings:

  - You are about to drop the column `cutoff` on the `CollegePage` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "CollegeCutoffSection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "collegePageId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "CollegeCutoffSection_collegePageId_fkey" FOREIGN KEY ("collegePageId") REFERENCES "CollegePage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CollegePage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "collegeId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "headerLogo" TEXT,
    "headerBgImage" TEXT,
    "authorName" TEXT,
    "brochureUrl" TEXT,
    "publishedAt" DATETIME,
    "location" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CollegePage_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CollegePage" ("authorName", "brochureUrl", "collegeId", "createdAt", "headerBgImage", "headerLogo", "id", "location", "publishedAt", "slug", "updatedAt") SELECT "authorName", "brochureUrl", "collegeId", "createdAt", "headerBgImage", "headerLogo", "id", "location", "publishedAt", "slug", "updatedAt" FROM "CollegePage";
DROP TABLE "CollegePage";
ALTER TABLE "new_CollegePage" RENAME TO "CollegePage";
CREATE UNIQUE INDEX "CollegePage_collegeId_key" ON "CollegePage"("collegeId");
CREATE UNIQUE INDEX "CollegePage_slug_key" ON "CollegePage"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
