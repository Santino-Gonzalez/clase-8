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
