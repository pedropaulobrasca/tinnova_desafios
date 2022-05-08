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
  id?: string;
  veiculo: string;
  marca: string;
  ano: number;
  descricao: string;
  vendido: boolean;
}

export class VeiculosService {
  constructor(private prisma: PrismaClient) {}

  public async findAll(
    filtros: {
      veiculo?: string;
      marca?: string;
      ano?: number;
      descricao?: string;
      vendido?: boolean;
    } = {}
  ) {
    const veiculos = await this.prisma.veiculos.findMany({
      where: {
        veiculo: {
          contains: filtros.veiculo && filtros.veiculo.toString(),
        },
        marca: {
          equals: filtros.marca && filtros.marca.toString(),
        },
        ano: {
          equals: filtros.ano && Number(filtros.ano),
        },
        descricao: {
          contains: filtros.descricao && filtros.descricao.toString(),
        },
        vendido: {
          equals: filtros.vendido && Boolean(Number(filtros.vendido)),
        },
      },
    });
    return veiculos;
  }

  public async findOne(id: string) {
    const veiculo = await this.prisma.veiculos.findUnique({
      where: {
        id,
      },
    });
    return veiculo;
  }

  public async findByDecada(decade: number) {
    const veiculos = await this.prisma.veiculos.findMany({
      where: {
        ano: {
          gte: decade,
          lte: decade + 9,
        },
      },
    });
    return { data: veiculos, total: veiculos.length };
  }

  public async findByMarcas(marca: string) {
    const veiculos = await this.prisma.veiculos.findMany({
      where: {
        marca: {
          contains: marca,
        },
      },
    });
    return { data: veiculos, total: veiculos.length };
  }

  public async findBySemanaAtual() {
    const veiculos = await this.prisma.veiculos.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
          lte: new Date(),
        },
      },
    });
    return { data: veiculos, total: veiculos.length };
  }

  public async create(veiculo: VeiculoProps) {
    // As marcas não poderão ser escritas erroneamente comparadas com as marcas disponíveis
    if (!marcas.includes(veiculo.marca)) {
      throw new Error("Marca inválida");
    }

    // O ano deverá ser um número inteiro com apenas o ano
    if (
      typeof veiculo.ano !== "number" ||
      veiculo.ano.toString().length !== 4
    ) {
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

  public async update(id: string, veiculo: VeiculoProps) {
    const updatedVeiculo = await this.prisma.veiculos.update({
      where: {
        id,
      },
      data: {
        veiculo: veiculo.veiculo,
        marca: veiculo.marca,
        ano: veiculo.ano,
        descricao: veiculo.descricao,
        vendido: veiculo.vendido,
        updatedAt: new Date(),
      },
    });
    return updatedVeiculo;
  }

  public async updatePartial(id: string, veiculo: Partial<VeiculoProps>) {
    const updatedVeiculo = await this.prisma.veiculos.update({
      where: {
        id,
      },
      data: {
        ...veiculo,
        updatedAt: new Date(),
      },
    });
    return updatedVeiculo;
  }

  public async delete(id: string) {
    const deletedVeiculo = await this.prisma.veiculos.delete({
      where: {
        id,
      },
    });
    return deletedVeiculo;
  }
}
