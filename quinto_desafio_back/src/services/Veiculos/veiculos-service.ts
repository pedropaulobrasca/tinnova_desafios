import { PrismaClient } from "@prisma/client";

// Marcas de veículos disponíveis
const marcas = [
  "Volkswagen",
  "Fiat",
  "Chevrolet",
  "Ford",
  "Toyota",
  "Honda",
  "Hyundai",
  "Kia",
  "Mazda",
  "Mercedes-Benz",
  "Nissan",
  "Peugeot",
  "Renault",
  "Seat",
  "Subaru",
  "Suzuki",
  "Volvo",
  "BMW",
];

export interface VeiculoProps {
  id?: number;
  veiculo: string;
  marca: string;
  ano: number;
  descricao: string;
  vendido: boolean;
}

export class VeiculosService {
  constructor(private prisma: PrismaClient) {}

  public async create(veiculo: VeiculoProps) {
    // As marcas não poderão ser escritas erroneamente comparadas com as marcas disponíveis
    if (!marcas.includes(veiculo.marca)) {
      throw new Error("Marca inválida");
    }

    // O ano deverá ser um número inteiro com apenas o ano
    if (typeof veiculo.ano !== "number" || veiculo.ano.toString().length !== 4) {
      throw new Error("Ano inválido");
    }

    const createdVeiculo = await this.prisma.veiculos.create({
      data: {
        veiculo: veiculo.veiculo,
        marca: veiculo.marca,
        ano: veiculo.ano,
        descricao: veiculo.descricao,
        vendido: veiculo.vendido,
      },
    });
    return createdVeiculo;
  }
}
