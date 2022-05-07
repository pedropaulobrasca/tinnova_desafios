export interface VeiculosCreateData {
  veiculo: string;
  marca: string;
  ano: number;
  descricao: string;
  vendido: boolean;
}

export interface VeiculosRepository {
  create: (data: VeiculosCreateData) => Promise<void>;
}
