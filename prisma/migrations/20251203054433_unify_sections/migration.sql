/*
  Warnings:

  - You are about to drop the `CollegeCutoffSection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CollegeCutoffSection";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CollegePageSection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "collegePageId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL DEFAULT 'INFO',
    CONSTRAINT "CollegePageSection_collegePageId_fkey" FOREIGN KEY ("collegePageId") REFERENCES "CollegePage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CollegePageSection" ("collegePageId", "content", "id", "order", "title") SELECT "collegePageId", "content", "id", "order", "title" FROM "CollegePageSection";
DROP TABLE "CollegePageSection";
ALTER TABLE "new_CollegePageSection" RENAME TO "CollegePageSection";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
