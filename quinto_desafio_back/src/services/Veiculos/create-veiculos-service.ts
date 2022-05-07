import { prisma } from "../../prisma";
import { VeiculosRepository } from "../../repositories/Veiculos/veiculos-repository";

interface CreateVeiculosServiceRequest {
  veiculo: string;
  marca: string;
  ano: number;
  descricao: string;
  vendido: boolean;
}

export class CreateVeiculosService {
  constructor(private veiculosRepository: VeiculosRepository) {}

  async execute({
    veiculo,
    marca,
    ano,
    descricao,
    vendido,
  }: CreateVeiculosServiceRequest): Promise<void> {
    await this.veiculosRepository.create({
      veiculo,
      marca,
      ano,
      descricao,
      vendido,
    });
  }
}
