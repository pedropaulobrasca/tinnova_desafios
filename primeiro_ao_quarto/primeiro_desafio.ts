// Votos em relação ao total de eleitores

class Voto {
  constructor(
    public totalEleitores: number,
    public totalVotosValidos: number,
    public totalVotosBrancos: number,
    public totalVotosNulos: number
  ) {}

  public percentualVotosValidos(): number {
    return (this.totalVotosValidos / this.totalEleitores) * 100;
  }
  public percentualVotosBrancos(): number {
    return (this.totalVotosBrancos / this.totalEleitores) * 100;
  }
  public percentualVotosNulos(): number {
    return (this.totalVotosNulos / this.totalEleitores) * 100;
  }
}

// Criando uma nova instancia da classe Voto com os valores.
const votos = new Voto(1000, 800, 150, 50);
console.log("Percentual de votos válidos:", votos.percentualVotosValidos());
console.log("Percentual de votos brancos:", votos.percentualVotosBrancos());
console.log("Percentual de votos nulos:", votos.percentualVotosNulos());
