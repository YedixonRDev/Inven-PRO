function agregarMovimiento() {
    const tipoMovimiento = document.getElementById("tipo-movimiento").value;
    const concepto = document.getElementById("concepto").value;
    const monto = document.getElementById("monto").value;

    if (tipoMovimiento && concepto && monto) {
        // Crear una fila en la tabla
        const tablaResultados = document.getElementById("resultados-dia").getElementsByTagName('tbody')[0];
        const nuevaFila = tablaResultados.insertRow();
        const celdaTipoMovimiento = nuevaFila.insertCell(0);
        const celdaConcepto = nuevaFila.insertCell(1);
        const celdaMonto = nuevaFila.insertCell(2);
        const celdaAcciones = nuevaFila.insertCell(3);

        // Agregar los datos a la fila
        celdaTipoMovimiento.innerHTML = tipoMovimiento;
        celdaConcepto.innerHTML = concepto;
        celdaMonto.innerHTML = monto;

        // botón de eliminar
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.onclick = function() {
            eliminarFila(nuevaFila);
        };
        celdaAcciones.appendChild(botonEliminar);

        // Limpiar los campos del formulario
        document.getElementById("tipo-movimiento").value = "";
        document.getElementById("concepto").value = "";
        document.getElementById("monto").value = "";
    } else {
        alert("Todos los campos son obligatorios.");
    }
 // Calcular el gasto total y mostrarlo en el input
calcularGastoTotal();
}

function calcularGastoTotal() {
const tablaResultados = document.getElementById("resultados-dia").getElementsByTagName('tbody')[0];
const filas = tablaResultados.getElementsByTagName('tr');

let gastoTotal = 0;

for (let i = 0; i < filas.length; i++) {
const montoCell = filas[i].getElementsByTagName('td')[2];
const monto = parseFloat(montoCell.innerText);
if (!isNaN(monto)) {
    gastoTotal += monto;
}
}

// Mostrar el gasto total en el input
const inputGastoTotal = document.getElementById("gasto-total");
inputGastoTotal.value = gastoTotal.toFixed(2); // Formatear el resultado a dos decimales
}

function eliminarFila(fila) {
    const tablaResultados = document.getElementById("resultados-dia").getElementsByTagName('tbody')[0];
    tablaResultados.removeChild(fila);
}

function buscarResultados() {


    // Aquí hay que implementar la lógica para buscar y mostrar resultados según la fecha seleccionada
   
}