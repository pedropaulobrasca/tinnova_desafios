// Fatorial de um número

function fatorial(numero: number): number {
  // Se o número for 0, retorna 1
  if (numero === 0) {
    return 1;
  } else {
    // Caso contrário, retorna o número multiplicado pelo fatorial do número anterior
    for (let i = numero; i > 1; i--) {
      numero = numero * (i - 1);
    }

    return numero;

    // Ou simplismente retorna o numero vezes o fatorial do numero -1 :D, porém da primeira forma é mais explicativa e mais fácil de entender
    // return numero * fatorial(numero - 1);
  }
}

console.log(fatorial(6));
