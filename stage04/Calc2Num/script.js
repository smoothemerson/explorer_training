const numberOne = Number(prompt("Digite o primeiro número: "));
const numberTwo = Number(prompt("Digite o segundo número: "));

if (isNaN(numberOne) || isNaN(numberTwo)) {
  alert("Por favor, digite números válidos.");
} else if (numberTwo === 0) {
  alert("O segundo número não pode ser zero para a divisão.");
} else {
  let sum = numberOne + numberTwo;
  let sub = numberOne - numberTwo;
  let multi = numberOne * numberTwo;
  let div = (numberOne / numberTwo).toFixed(1);
  let rest = numberOne % numberTwo;

  alert(`A soma dos dois números é: ${sum}`);
  alert(`A subtração dos dois números é: ${sub}`);
  alert(`A multiplicação dos dois números é: ${multi}`);
  alert(`A divisão dos dois números é: ${div}`);
  alert(`O resto da divisão dos dois números é: ${rest}`);

  if (sum % 2 === 0) {
    alert(`A soma dos dois números é par: ${sum}`);
  } else {
    alert(`A soma dos dois números é ímpar: ${sum}`);
  }

  switch (true) {
    case numberOne === numberTwo:
      alert("Os números inseridos são iguais.");
      break;
    case numberOne !== numberTwo:
      alert("Os números inseridos são diferentes.");
      break;
    default:
      alert("Erro!");
  }
}
