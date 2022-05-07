import { PrismaClient } from "@prisma/client";
import express from "express";

export const routes = express.Router();
const prisma = new PrismaClient();

routes.get("/", (req, res) => {
  res.json({ message: "Hello World!!" });
});

// Cadastra um novo veículo
routes.post("/veiculos", async (req, res) => {
  const veiculo = await prisma.veiculos.create({
    data: {
      veiculo: req.body.veiculo,
      marca: req.body.marca,
      ano: req.body.ano,
      descricao: req.body.descricao,
      vendido: req.body.vendido,
    },
  });
  res.json(veiculo);
});

// Retorna todos os veículos de acordo com os filtros
// Exemplo: /veiculos?marca=Volkswagen&ano=2019
routes.get("/veiculos", async (req, res) => {
  const { veiculo, marca, ano, descricao, vendido } = req.query as any;
  // converte o vendido para boolean
  const vendidoBoolean = vendido === "true" && vendido ? true : false;
  const veiculos = await prisma.veiculos.findMany({
    where: {
      veiculo: {
        contains: veiculo && veiculo.toString(),
      },
      marca: {
        equals: marca && marca.toString(),
      },
      ano: {
        equals: ano && Number(ano),
      },
      descricao: {
        contains: descricao && descricao.toString(),
      },
      vendido: {
        equals: vendidoBoolean && vendidoBoolean,
      },
    },
  });
  res.json(veiculos);
});

// Retorna um veículo específico
// Exemplo: /veiculos/1
routes.get("/veiculos/:id", async (req, res) => {
  const veiculo = await prisma.veiculos.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.json(veiculo);
});
