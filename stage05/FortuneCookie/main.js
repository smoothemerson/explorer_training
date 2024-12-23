// Variáveis
const screen1 = document.querySelector(".screen1");
const screen2 = document.querySelector(".screen2");
const cookie = document.querySelector("#cookie");
const btnReset = document.querySelector("#btnReset");

const inspirationalMessages = [
  "A vida trará coisas boas se tiveres paciência.",
  "Demonstre amor e alegria em todas as oportunidades.",
  "Acredite em milagres, mas não dependa deles.",
  "O sucesso está na jornada, não no destino final.",
  "Mantenha seus objetivos no horizonte e não as pedras aos seus pés.",
  "A sorte favorece os corajosos.",
  "Não tenha medo de falhar, tenha medo de não tentar.",
  "Grandes coisas nunca vêm de zonas de conforto.",
  "Siga seus sonhos, eles conhecem o caminho.",
  "A vida é feita de escolhas, faça escolhas que te fazem feliz.",
];

// Eventos
btnReset.addEventListener("click", handleResetClick);
cookie.addEventListener("click", toggleScreen);
document.addEventListener("keydown", keyPressed);

// Funções
function handleResetClick() {
  toggleScreen();
}

function toggleScreen() {
  screen1.classList.toggle("hide");
  screen2.classList.toggle("hide");
  changeMessage();
}

function keyPressed(e) {
  if (e.key == "Enter") {
    handleResetClick();
  }
}

function changeMessage() {
  const message = document.querySelector("#message");
  const randomIndex = Math.floor(Math.random() * inspirationalMessages.length);
  const randomMessage = inspirationalMessages[randomIndex];

  message.textContent = randomMessage;
}
