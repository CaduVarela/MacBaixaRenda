/*
  Warnings:

  - You are about to drop the column `celular` on the `order` table. All the data in the column will be lost.
  - Added the required column `phone` to the `order` table without a default value. This is not possible if the table is not empty.

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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_order" ("cep", "city", "createdAt", "deliveryType", "id", "name", "neighborhood", "number", "paymentType", "state", "street", "updatedAt") SELECT "cep", "city", "createdAt", "deliveryType", "id", "name", "neighborhood", "number", "paymentType", "state", "street", "updatedAt" FROM "order";
DROP TABLE "order";
ALTER TABLE "new_order" RENAME TO "order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
