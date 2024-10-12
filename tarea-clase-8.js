/*# Tarea clase 8

A las 2 tareas de la clase 6, ponerles las validaciones que consideren
necesarias.

TIP: Las edades no pueden tener decimales.
*/

function validarCantidadIntegrantes(cantidad){
    if(cantidad === 0){
        console.error("La cantidad de integrantes debe ser de al menos 1.");
    }else if(cantidad < 0){
        console.error("La cantidad de integrantes no puede ser negativa.");
    }else{
        console.log("Se ha verificado correctamente la cantidad de integrantes.");
    }
}

function validarEdadesIntegrantes(edad){
    if(edad < 0){
        console.error("La edad no puede ser negativa.");
    }else if(edad % 1 !== 0){
        console.error("La edad no puede tener decimales.");
    }else{
        console.log("Se ha verificado correctamente la edad de los integrantes.");
    }
}

function validarSueldos(sueldo){
    if(sueldo === 0){
        console.error("El sueldo no puede ser 0.");
    }else if(sueldo < 0){
        console.error("El sueldo no puede ser negativo.");
    }else{
        console.log("Se ha verificado correctamente el sueldo.");
    }
}
