import express from "express";
import { PrismaVeiculosRepository } from "./repositories/Veiculos/prisma/prisma-veiculos-repository";
import { CreateVeiculosService } from "./services/Veiculos/create-veiculos-service";

export const routes = express.Router();

routes.get("/", (req, res) => {
  res.json({ message: "Hello World!!" });
});

routes.post("/veiculos", async (req, res) => {
  const prismaVeiculosRepository = new PrismaVeiculosRepository();
  const createVeiculosService = new CreateVeiculosService(
    prismaVeiculosRepository
  );

  await createVeiculosService.execute(req.body);

  res.status(201).json({ message: "Veiculo criado com sucesso!" });
});
