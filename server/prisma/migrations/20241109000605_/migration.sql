-- CreateTable
CREATE TABLE "orderProduct" (
    "productId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "observations" TEXT,

    PRIMARY KEY ("productId", "orderId"),
    CONSTRAINT "orderProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orderProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
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
