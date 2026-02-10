-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CollegeFaq" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "collegePageId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "CollegeFaq_collegePageId_fkey" FOREIGN KEY ("collegePageId") REFERENCES "CollegePage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CollegeFaq" ("answer", "collegePageId", "id", "order", "question", "title") SELECT "answer", "collegePageId", "id", "order", "question", "title" FROM "CollegeFaq";
DROP TABLE "CollegeFaq";
ALTER TABLE "new_CollegeFaq" RENAME TO "CollegeFaq";
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
CREATE TABLE "new_CollegePageSection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "collegePageId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "CollegePageSection_collegePageId_fkey" FOREIGN KEY ("collegePageId") REFERENCES "CollegePage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CollegePageSection" ("collegePageId", "content", "id", "order", "title") SELECT "collegePageId", "content", "id", "order", "title" FROM "CollegePageSection";
DROP TABLE "CollegePageSection";
ALTER TABLE "new_CollegePageSection" RENAME TO "CollegePageSection";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
