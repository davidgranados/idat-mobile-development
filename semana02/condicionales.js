// Variables globales
let currentQuestion = 0;
let answers = [];

// Definir todas las preguntas
const questions = [
    {
        text: "1. Ingresa un número:",
        process: function(input) {
            let numero = parseFloat(input);
            if (isNaN(numero)) {
                return "Por favor ingresa un número válido";
            }
            if (numero > 0) {
                return "El número " + numero + " es positivo";
            } else if (numero < 0) {
                return "El número " + numero + " es negativo";
            } else {
                return "El número es cero";
            }
        }
    },
    {
        text: "2. Ingresa tu edad:",
        process: function(input) {
            let edad = parseInt(input);
            if (isNaN(edad) || edad < 0) {
                return "Por favor ingresa una edad válida";
            }
            if (edad >= 18) {
                return "Eres mayor de edad (" + edad + " años)";
            } else {
                return "Eres menor de edad (" + edad + " años)";
            }
        }
    },
    {
        text: "3. Ingresa un número:",
        process: function(input) {
            let numero = parseFloat(input);
            if (isNaN(numero)) {
                return "Por favor ingresa un número válido";
            }
            if (numero === 10) {
                return "El número es estrictamente igual a 10";
            } else {
                return "El número no es estrictamente igual a 10";
            }
        }
    },
    {
        text: "4. Ingresa un número:",
        process: function(input) {
            let numero = parseInt(input);
            if (isNaN(numero)) {
                return "Por favor ingresa un número válido";
            }
            if (numero % 2 === 0) {
                return "El número " + numero + " es par";
            } else {
                return "El número " + numero + " es impar";
            }
        }
    },
    {
        text: "5. Ingresa una contraseña:",
        process: function(input) {
            if (input === "1234") {
                return "Contraseña correcta";
            } else {
                return "Contraseña incorrecta";
            }
        }
    },
    {
        text: "6a. Ingresa el primer número:",
        process: function(input) {
            this.firstNumber = parseFloat(input);
            if (isNaN(this.firstNumber)) {
                return "Por favor ingresa un número válido";
            }
            return "Primer número guardado: " + this.firstNumber;
        },
        needsSecondInput: true,
        secondText: "6b. Ingresa el segundo número:",
        processSecond: function(input) {
            let secondNumber = parseFloat(input);
            if (isNaN(secondNumber)) {
                return "Por favor ingresa un número válido";
            }
            if (this.firstNumber === secondNumber) {
                return "Los números " + this.firstNumber + " y " + secondNumber + " son iguales";
            } else {
                return "Los números " + this.firstNumber + " y " + secondNumber + " son diferentes";
            }
        }
    },
    {
        text: "7. Ingresa una nota:",
        process: function(input) {
            let nota = parseFloat(input);
            if (isNaN(nota)) {
                return "Por favor ingresa una nota válida";
            }
            if (nota >= 11) {
                return "La nota " + nota + " es aprobatoria";
            } else {
                return "La nota " + nota + " es desaprobatoria";
            }
        }
    },
    {
        text: "8. Ingresa un día de la semana (ejemplo: lunes, martes, etc.):",
        process: function(input) {
            let dia = input.toLowerCase().trim();
            if (dia === "sábado" || dia === "sabado" || dia === "domingo") {
                return "El " + dia + " es fin de semana";
            } else if (dia === "lunes" || dia === "martes" || dia === "miércoles" ||
                      dia === "miercoles" || dia === "jueves" || dia === "viernes") {
                return "El " + dia + " es día de semana";
            } else {
                return "'" + dia + "' no es un día válido de la semana";
            }
        }
    },
    {
        text: "9. Ingresa un número:",
        process: function(input) {
            let numero = parseFloat(input);
            if (isNaN(numero)) {
                return "Por favor ingresa un número válido";
            }
            if (numero !== 0) {
                return "El número " + numero + " no es cero";
            } else {
                return "El número es cero";
            }
        }
    },
    {
        text: "10. Ingresa un nombre de usuario:",
        process: function(input) {
            if (input === "admin") {
                return "Bienvenido administrador";
            } else {
                return "Bienvenido usuario normal: " + input;
            }
        }
    }
];

// Función para mostrar pregunta y respuesta en el HTML
function addToList(question, answer) {
    const answersList = document.getElementById("answers");

    // Crear elemento para la pregunta
    const questionItem = document.createElement("li");
    questionItem.className = "question";
    questionItem.textContent = question;

    // Crear elemento para la respuesta
    const answerItem = document.createElement("li");
    answerItem.className = "answer";
    answerItem.textContent = answer;

    // Agregar ambos elementos a la lista
    answersList.appendChild(questionItem);
    answersList.appendChild(answerItem);
}

// Función para procesar la siguiente pregunta
function nextQuestion() {
    const btn = document.getElementById("nextBtn");

    if (currentQuestion >= questions.length) {
        // Todas las preguntas completadas
        const answersList = document.getElementById("answers");
        const completedMsg = document.createElement("li");
        completedMsg.className = "completed";
        completedMsg.textContent = "¡Todas las preguntas completadas!";
        answersList.appendChild(completedMsg);

        btn.textContent = "Completado";
        btn.disabled = true;
        return;
    }

    const question = questions[currentQuestion];

    // Verificar si es la segunda parte de la pregunta 6
    if (question.waitingForSecond) {
        const userInput = prompt(question.secondText);
        if (userInput !== null) {
            const answer = question.processSecond(userInput);
            addToList(question.secondText, answer);
            answers.push(answer);
        }
        question.waitingForSecond = false;
        currentQuestion++;
        btn.textContent = currentQuestion >= questions.length ? "Finalizar" : "Siguiente Pregunta";
        return;
    }

    // Mostrar la pregunta actual
    const userInput = prompt(question.text);

    if (userInput !== null) { // El usuario no canceló
        const answer = question.process(userInput);
        addToList(question.text, answer);
        answers.push(answer);

        // Verificar si necesita una segunda entrada (pregunta 6)
        if (question.needsSecondInput) {
            question.waitingForSecond = true;
            btn.textContent = "Siguiente Parte";
        } else {
            currentQuestion++;
            btn.textContent = currentQuestion >= questions.length ? "Finalizar" : "Siguiente Pregunta";
        }
    }
}

// Configurar el evento del botón cuando se carga la página
document.addEventListener("DOMContentLoaded", function() {
    const btn = document.getElementById("nextBtn");
    btn.addEventListener("click", nextQuestion);
});
