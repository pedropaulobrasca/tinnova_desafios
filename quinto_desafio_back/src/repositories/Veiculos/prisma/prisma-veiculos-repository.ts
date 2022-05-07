import { prisma } from "../../../prisma";
import { VeiculosCreateData, VeiculosRepository } from "../veiculos-repository";

export class PrismaVeiculosRepository implements VeiculosRepository {
  async create({
    veiculo,
    marca,
    ano,
    descricao,
    vendido,
  }: VeiculosCreateData) {
    await prisma.veiculos.create({
      data: {
        veiculo,
        marca,
        ano,
        descricao,
        vendido,
      },
    });
  }
}
