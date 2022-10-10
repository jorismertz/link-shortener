-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "originalUrl" TEXT NOT NULL,
    "shorthand" TEXT NOT NULL,
    "visitedAmount" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Link" ("createdAt", "id", "originalUrl", "shorthand") SELECT "createdAt", "id", "originalUrl", "shorthand" FROM "Link";
DROP TABLE "Link";
ALTER TABLE "new_Link" RENAME TO "Link";
CREATE UNIQUE INDEX "Link_shorthand_key" ON "Link"("shorthand");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
