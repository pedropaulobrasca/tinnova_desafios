// Algoritimo de ordenação Bubble Sort

// Criando um vetor com 5 elementos aleatórios
const vetor = [
  Math.floor(Math.random() * 100),
  Math.floor(Math.random() * 100),
  Math.floor(Math.random() * 100),
  Math.floor(Math.random() * 100),
  Math.floor(Math.random() * 100),
];
// const vetor = [5, 3, 2, 4, 7, 1, 0, 6];

// Função que realiza a ordenação do vetor
function bubbleSort(vetor: number[]): number[] {
  let i, j, auxiliar;
  // Percorre o vetor
  for (i = 0; i < vetor.length; i++) {
    // Para cada elemento do vetor, verifica se o elemento anterior é maior que ele
    for (j = 0; j < vetor.length - 1; j++) {
      // vetor.length - 1 para não percorrer o último elemento
      // Se o primeiro elemento for maior que o segundo, realiza a troca
      if (vetor[j] > vetor[j + 1]) {
        // armazena o elemento atual no auxiliar
        auxiliar = vetor[j];
        // substitui o elemento atual pelo elemento anterior
        vetor[j] = vetor[j + 1];
        // substitui o elemento anterior pelo elemento atual
        vetor[j + 1] = auxiliar;
      }
    }
  }
  return vetor;
}

console.log(bubbleSort(vetor));
