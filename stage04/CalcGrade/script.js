
let students = {
  student1 : {
    name: "Pedro",
    firstTest: 8.0,
    secondTest: 6.0
  },
  student2 : {
    name: "Ana",
    firstTest: 5.0,
    secondTest: 6.0
  },
  student3 : {
    name: "Miguel",
    firstTest: 4.0,
    secondTest: 6.0
  },
  student4 : {
    name: "Manuela",
    firstTest: 8.0,
    secondTest: 7.0
  }
}

function calculateGrade(grade1, grade2) {
  average = ((grade1 + grade2) / 2).toFixed(1)
  return average
}

let minimumGrade = 7.0

for(let studentIndex in students) {
  let student = students[studentIndex]
  studentAverage = calculateGrade(student.firstTest, student.secondTest)
  
  if(studentAverage >= minimumGrade) {
    alert(`A média do(a) aluno(a) ${student.name} é: ${studentAverage}
    Parabéns ${student.name}! Você foi aprovado(a) no concurso!`)
  } else {
    alert(`A média do(a) aluno(a) ${student.name} é: ${studentAverage}
    Não foi dessa vez ${student.name}! Tente novamente!`)
  }}