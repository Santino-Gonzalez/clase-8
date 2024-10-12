/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).

TAREA:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, salario anual promedio y salario mensual promedio.

Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/

function calcularMayor(valores) {
    let maximo = 0;

    for (let i = 0; i < valores.length; i++) {
        if (maximo == 0) {
            maximo = valores[i];
        } else if (valores[i] > maximo) {
            maximo = valores[i];
        }
    }

    return maximo;
}

function calcularMenor(valores) {
    let minimo = 0;

    for (let i = 0; i < valores.length; i++) {
        if (minimo == 0) {
            minimo = valores[i];
        } else if (valores[i] < minimo) {
            minimo = valores[i];
        }
    }

    return minimo;
}

function calcularPromedio(valores) {
    let suma = 0;

    for (let i = 0; i < valores.length; i++) {
        suma = suma + valores[i];
    }

    return suma / valores.length;
}

function calcularPromedioSalarioMensual(arraySalariosAnual) {
    let suma = 0;

    for (let i = 0; i < arraySalariosAnual.length; i++) {
        suma = suma + arraySalariosAnual[i] / 12;
    }

    return suma / arraySalariosAnual.length;
}


let cantidadIntegrantes = document.querySelector("#cantidadIntegrantes");
let formEdades = document.querySelector("#formEdades");
let resultadoEdades = document.querySelector("#resultadosEdades");
let resultadoSalarios = document.querySelector("#resultadosSalarios");

document.querySelector("#botonSiguiente").onclick = function () {

    if (cantidadIntegrantes.value > 0) {

        document.querySelector("#botonSiguiente").style.display = "none";
        cantidadIntegrantes.disabled = true;

        let label = document.createElement("label");
        let br = document.createElement("br");
        let br2 = document.createElement("br");
        let botonCalcular = document.createElement("button");
        let botonReset = document.createElement("button");

        botonReset.id = "botonReset";
        botonReset.textContent = "Resetear";
        botonCalcular.textContent = "Calcular";
        botonCalcular.id = "botonCalcular";
        label.innerHTML = "Ingrese la edad de sus familiares:";
        label.id = "labelEdad";

        formEdades.appendChild(label);
        formEdades.appendChild(br);
        formEdades.appendChild(br2);

        for (let i = 0; i < cantidadIntegrantes.value; i++) {
            let br = document.createElement("br");
            let br2 = document.createElement("br");
            let input = document.createElement("input");
            let botonAgregar = document.createElement("button");
            let botonQuitar = document.createElement("button");
            let inputSueldo = document.createElement("input");

            input.placeholder = `Edad del familiar Nº${i + 1}`;
            input.id = `edadIntegrante${i + 1}`;
            input.className = "edades";
            botonAgregar.textContent = "Trabaja";
            botonQuitar.textContent = "No trabaja";
            inputSueldo.className = "salarios";
            inputSueldo.placeholder = `Sueldo anual familiar Nº${i + 1}`

            formEdades.appendChild(input);
            formEdades.appendChild(botonAgregar);
            formEdades.appendChild(br);
            formEdades.appendChild(br2);

            botonAgregar.onclick = function () {
                botonAgregar.remove();
                formEdades.insertBefore(inputSueldo, input.nextSibling);
                formEdades.insertBefore(botonQuitar, inputSueldo.nextSibling);

                botonQuitar.onclick = function () {
                    botonQuitar.remove();
                    inputSueldo.remove();
                    formEdades.insertBefore(botonAgregar, input.nextSibling);
                }

                return false;
            }
        }


        formEdades.appendChild(botonCalcular);
        formEdades.appendChild(botonReset);

        document.querySelector("#botonCalcular").onclick = function () {

            let edades = document.querySelectorAll(".edades");
            let salarios = document.querySelectorAll(".salarios");
            let arrayEdades = [];
            let arraySalarios = [];

            for (let i = 0; i < edades.length; i++) {
                arrayEdades.push(Number(edades[i].value));
            }

            for (let i = 0; i < salarios.length; i++) {
                if (salarios[i].value != "") {
                    arraySalarios.push(Number(salarios[i].value));
                }
            }

            for (let i = 0; i < edades.length; i++) {
                edades[i].disabled = true;
            }

            for (let i = 0; i < salarios.length; i++) {
                salarios[i].disabled = true;
            }

            resultadoEdades.textContent = `La persona mas mayor de tu familia tiene ${calcularMayor(arrayEdades)} años, 
            la menor tiene ${calcularMenor(arrayEdades)} años y el promedio de edad de la familia es de ${calcularPromedio(arrayEdades)} años.`;

            resultadoSalarios.textContent = `La persona con mayor salario de tu familia cobra $${calcularMayor(arraySalarios)}, 
            la que tiene menor salario cobra $${calcularMenor(arraySalarios)}, 
            el promedio de salario de la familia es $${calcularPromedio(arraySalarios)} 
            y el promedio de salario mensual de la familia es $${calcularPromedioSalarioMensual(arraySalarios)}`;

            botonCalcular.remove();

            return false;
        }

        document.querySelector("#botonReset").onclick = function () {

            label.remove();
            botonCalcular.remove();
            botonReset.remove();
            resultadoEdades.textContent = "";
            resultadoSalarios.textContent = "";

            for (let i = 0; i < cantidadIntegrantes.value; i++) {
                let input = document.getElementById(`edadIntegrante${i + 1}`);
                input.remove();
            }

            while (document.getElementById("formEdades").childNodes.length != 0) {
                document.getElementById("formEdades").removeChild(document.getElementById("formEdades").firstChild);
            }

            document.querySelector("#botonSiguiente").style.display = "";
            cantidadIntegrantes.disabled = false;

            return false;
        }

    } else {
        alert("La cantidad de integrantes de su familia debe ser de al menos 1.");
    }
    return false;
}




