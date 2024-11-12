/*
  Warnings:

  - Added the required column `statusId` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cep" TEXT,
    "street" TEXT,
    "number" TEXT,
    "city" TEXT,
    "state" TEXT,
    "neighborhood" TEXT,
    "deliveryType" TEXT NOT NULL,
    "paymentType" TEXT NOT NULL,
    "statusId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "order_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_order" ("cep", "city", "createdAt", "deliveryType", "id", "name", "neighborhood", "number", "paymentType", "phone", "state", "street", "updatedAt") SELECT "cep", "city", "createdAt", "deliveryType", "id", "name", "neighborhood", "number", "paymentType", "phone", "state", "street", "updatedAt" FROM "order";
DROP TABLE "order";
ALTER TABLE "new_order" RENAME TO "order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
