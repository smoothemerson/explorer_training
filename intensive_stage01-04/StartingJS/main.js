
// 1. Crie um script que exiba a mensagem "Hello World!" em um alerta no navegador.

console.log("Hello World!")

// 2. Crie um script que declare duas variáveis e exiba o resultado da soma entre elas.

let sum1 = 4
let sum2 = 6
let sum = sum1 + sum2
console.log(`A soma de: ${sum1} + ${sum2} = ${sum}`)

/* 
  3.  Crie um script que declare uma variável e verifique se o seu valor é um número. 
  Se for, exiba a mensagem "É um número", caso contrário, exiba a mensagem "Não é um número".
*/

let number = "um texto"
let isANumber = typeof(number)
if(isANumber === "number"){
  console.log(`${number} é um número`)
} else {
  console.log(`"${number}" não é um número`)
}

/*
  4. Crie um script que declare uma variável e verifique se o seu valor é uma string. 
  Se for, exiba a mensagem "É uma string", caso contrário, exiba a mensagem "Não é uma string".
*/

let string = "uma String"
let isAString = typeof(string)
if(isAString === "string"){
  console.log(`"${string}" é uma string`)
} else {
  console.log(`${string} não é uma string`)
}

/*
  5. Crie um script que declare uma variável e verifique se o seu valor é um booleano. 
  Se for, exiba a mensagem "É um booleano", caso contrário, exiba a mensagem "Não é um booleano".
*/

let boolean = true
let isBoolean = typeof(boolean)
if(isBoolean === "boolean"){
  console.log(`${boolean} é um booleano`)
} else {
  console.log(`"${boolean}" não é booleano`)
}

// 6. Crie um script que declare duas variáveis e exiba o resultado da subtração entre elas.

let sub1 = 10
let sub2 = 5
let sub = sub1 - sub2
console.log(`A subtração de: ${sub1} - ${sub2} = ${sub}`)

// 7. Crie um script que declare duas variáveis e exiba o resultado da multiplicação entre elas.

let multi1 = 4
let multi2 = 8
let multi = multi1 * multi2
console.log(`A multiplicação de: ${multi1} x ${multi2} = ${multi}`)

// 8. Crie um script que declare duas variáveis e exiba o resultado da divisão entre elas.

let div1 = 20
let div2 = 2
let div = div1 / div2
console.log(`A divisão de: ${div1} / ${div2} = ${div}`)

/*
  9. Crie um script que declare uma variável e verifique se o seu valor é um número par. 
  Se for, exiba a mensagem "É um número par", caso contrário, exiba a mensagem "Não é um número par".
*/

let even = 4
let isEven = even % 2 === 0
if(isEven){
  console.log(`${even} é um número par`)
} else {
  console.log(`${even} não é um número par`)
}

/*
  Crie um script que declare uma variável e verifique se o seu valor é um número ímpar. 
  Se for, exiba a mensagem "É um número ímpar", caso contrário, exiba a mensagem "Não é um número ímpar".
*/

let odd = 1
let isOdd = odd % 2 === 1
if(isOdd){
  console.log(`${odd} é um número ímpar`)
} else {
  console.log(`${odd} não é um número ímpar`)
}