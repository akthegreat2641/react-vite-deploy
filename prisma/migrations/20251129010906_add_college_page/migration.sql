-- CreateTable
CREATE TABLE "CollegePage" (
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
    CONSTRAINT "CollegePage_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CollegePageSection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "collegePageId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "CollegePageSection_collegePageId_fkey" FOREIGN KEY ("collegePageId") REFERENCES "CollegePage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CollegeFaq" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "collegePageId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "CollegeFaq_collegePageId_fkey" FOREIGN KEY ("collegePageId") REFERENCES "CollegePage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "CollegePage_collegeId_key" ON "CollegePage"("collegeId");

-- CreateIndex
CREATE UNIQUE INDEX "CollegePage_slug_key" ON "CollegePage"("slug");
