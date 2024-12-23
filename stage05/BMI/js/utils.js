export function notANumber(value) {
  return isNaN(value) || value == "";
}

export function calculateIMC(weight, height) {
  const calcIMC = (weight / (height / 100) ** 2).toFixed(2);
  return calcIMC;
}
