// Variáveis
const screen1 = document.querySelector(".screen1");
const screen2 = document.querySelector(".screen2");
const btnTry = document.querySelector("#btnTry");
const btnReset = document.querySelector("#btnReset");
let randomNumber = Math.round(Math.random() * 10);
let xAttempts = 1;

// Eventos
btnTry.addEventListener("click", handleTryClick);
btnReset.addEventListener("click", handleResetClick);
document.addEventListener("keydown", keyPressed);

// Funções
function handleTryClick(event) {
  event.preventDefault(); // não faça o padrão
  const inputNumber = document.querySelector("#inputNumber");
  const numericValue = Number(inputNumber.value);

  // Validação
  if (numericValue == randomNumber) {
    toggleScreen();
    screen2.querySelector(
      "h2"
    ).innerText = `Você acertou em ${xAttempts} tentativas!`;
  } else if (isNaN(numericValue) || inputNumber.value === "") {
    alert("Precisamos de um número!");
  } else if (numericValue < 0) {
    alert("O número não pode ser menor que 0");
  } else if (numericValue > 10) {
    alert("O número não pode ser maior que 10");
  }

  inputNumber.value = "";
  xAttempts++;
}

function handleResetClick() {
  toggleScreen();
  xAttempts = 1;
  randomNumber = Math.round(Math.random() * 10);
}

function toggleScreen() {
  screen1.classList.toggle("hide");
  screen2.classList.toggle("hide");
}

function keyPressed(e) {
  if (e.key == "Enter" && screen1.classList.contains("hide")) {
    handleResetClick();
  }
}
