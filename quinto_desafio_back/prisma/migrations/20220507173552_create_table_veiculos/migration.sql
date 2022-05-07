-- CreateTable
CREATE TABLE "veiculos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "veiculo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "vendido" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
