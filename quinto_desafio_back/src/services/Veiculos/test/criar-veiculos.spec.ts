import { PrismaClient } from "@prisma/client";
import { VeiculosService } from "../veiculos-service";

const prisma = new PrismaClient();
const veiculosService = new VeiculosService(prisma);

describe("Criar um veiculo", () => {
  it("Não será possivel criar um veículo com a marca escrito errada.", async () => {
    await expect(
      veiculosService.create({
        veiculo: "Fiat 147",
        marca: "Fiate",
        ano: 2019,
        descricao: "Fiat 147",
        vendido: false,
      })
    ).rejects.toThrowError("Marca inválida");
  });

  it("Não será possivel criar um veículo com o ano escrito errado.", async () => {
    await expect(
      veiculosService.create({
        veiculo: "Fiat 147",
        marca: "Fiat",
        ano: 200,
        descricao: "Fiat 147",
        vendido: false,
      })
    ).rejects.toThrowError("Ano inválido");
  });
});
