import { PrismaClient } from "@prisma/client";
import express from "express";
import { VeiculosService } from "./services/Veiculos/veiculos-service";

export const routes = express.Router();
const prisma = new PrismaClient();
const veiculosService = new VeiculosService(prisma);

// Retorna todos os veículos de acordo com os filtros
// Exemplo: /veiculos?marca=Volkswagen&ano=2019
routes.get("/veiculos", async (req, res) => {
  try {
    const veiculos = await veiculosService.findAll(req.query);
    res.status(200).json(veiculos);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Retorna os veiculos cadastrados na semana atual
// Exemplo: /veiculos/semana
routes.get("/veiculos/semana", async (req, res) => {
  try {
    const veiculos = await veiculosService.findBySemanaAtual();
    res.status(200).json(veiculos);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Retorna um veículo específico
// Exemplo: /veiculos/1
routes.get("/veiculos/:id", async (req, res) => {
  try {
    const veiculo = await veiculosService.findOne(req.params.id);
    res.status(200).json(veiculo);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Retorna os veiculos por década
// Exemplo: /veiculos/decada/1900 (1910, 1920, 1930, ...)
routes.get("/veiculos/decada/:decada", async (req, res) => {
  try {
    const veiculos = await veiculosService.findByDecada(
      Number(req.params.decada)
    );
    res.status(200).json(veiculos);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Retorna a quantidade de veiculos por marca
// Exemplo: /veiculos/marcas/fiat
routes.get("/veiculos/marca/:marca", async (req, res) => {
  try {
    const veiculos = await veiculosService.findByMarcas(req.params.marca);
    res.status(200).json(veiculos);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Cadastra um novo veículo
routes.post("/veiculos", async (req, res) => {
  try {
    const createdVeiculo = await veiculosService.create(req.body);
    res.status(201).json(createdVeiculo);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Atualiza um veículo específico
// Exemplo: /veiculos/1
routes.put("/veiculos/:id", async (req, res) => {
  try {
    const updatedVeiculo = await veiculosService.update(
      req.params.id,
      req.body
    );
    res.json(updatedVeiculo);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Atualiza apenas alguns dados de um veículo específico
// Exemplo: /veiculos/1
routes.patch("/veiculos/:id", async (req, res) => {
  try {
    const updatedVeiculo = await veiculosService.updatePartial(
      req.params.id,
      req.body
    );
    res.json(updatedVeiculo);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Deleta um veículo específico
// Exemplo: /veiculos/1
routes.delete("/veiculos/:id", async (req, res) => {
  try {
    const deletedVeiculo = await veiculosService.delete(req.params.id);
    res.json(deletedVeiculo);
  } catch (error) {
    res.status(400).json({ error });
  }
});
