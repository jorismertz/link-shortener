-- CreateTable
CREATE TABLE "Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "originalUrl" TEXT NOT NULL,
    "shorthand" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_shorthand_key" ON "Link"("shorthand");
