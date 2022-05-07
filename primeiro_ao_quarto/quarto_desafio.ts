// Soma dos multiplos de 3 e 5 menores que 10

function somaMultiplos(limite: number): number {
  // Inicializando a variável soma
  let soma = 0;

  // Loop para somar os multiplos de 3 e 5
  for (let i = 0; i < limite; i++) {
    // Verificando se o número é multiplo de 3 ou 5
    // Basicamente se o resto da divisão por 3 ou 5 for 0 significa que é multiplo
    if (i % 3 === 0 || i % 5 === 0) {
      // Somando o número a variável soma
      soma += i;
    }
  }
  return soma;
}

console.log(somaMultiplos(10));
