//BLOQUE 1 
document.addEventListener("DOMContentLoaded", function () {
  const mesas = document.querySelectorAll(".disponible-btn");
  const numeroMesaInput = document.getElementById("numeroMesa");

  mesas.forEach((mesa) => {
      mesa.addEventListener("click", function () {
          const numeroMesa = mesa.getAttribute("data-id");

          // Cambiar el estado del botón (de Disponible a Ocupado o viceversa)
          if (mesa.textContent === "Disponible") {
              mesa.textContent = "Ocupado";
              mesa.classList.add("ocupado");
          } else {
              mesa.textContent = "Disponible";
              mesa.classList.remove("ocupado");
          }

          // Copiar el número de mesa al campo de "Número de Mesa" en el bloque3
          numeroMesaInput.value = numeroMesa;
      });
  });
});



//Bloque 2

//Agregar productos 

// ... Buscador 
document.addEventListener("DOMContentLoaded", function () {
  const buscarProductoInput = document.getElementById("buscarProductoInput");
  const productTableBody = document.getElementById("product-list");

  buscarProductoInput.addEventListener("input", function () {
    const terminoBusqueda = buscarProductoInput.value.trim().toLowerCase();

    // Obtener todas las filas de productos
    const filasProductos = productTableBody.getElementsByTagName("tr");

    // Iterar a través de las filas y mostrar/ocultar según el término de búsqueda
    for (let i = 0; i < filasProductos.length; i++) {
      const nombreProducto = filasProductos[i].getElementsByTagName("td")[0].textContent.toLowerCase();
      const categoriaProducto = filasProductos[i].getElementsByTagName("td")[1].textContent.toLowerCase();

      // Verificar si el término de búsqueda coincide con el nombre o la categoría del producto
      if (nombreProducto.includes(terminoBusqueda) || categoriaProducto.includes(terminoBusqueda) || terminoBusqueda === "") {
        filasProductos[i].style.display = "table-row";
      } else {
        filasProductos[i].style.display = "none";
      }
    }
  });
});



//BLOQUE 3

document.addEventListener("DOMContentLoaded", function () {
  const agregarProductoForm = document.getElementById("agregarProductoForm");
  const productTableBody = document.getElementById("product-list");
  const agregarProductoButton = document.getElementById("agregarProducto");
  const cuentaTotalSpan = document.getElementById("cuentaTotal");
  const listaCuenta = document.getElementById("listaCuenta");
  const generarFacturaButton = document.getElementById("generarFactura");

  agregarProductoButton.addEventListener("click", function () {
    const nombreProducto = document.getElementById("nombreProducto").value;
    const categoriaProducto = document.getElementById("categoriaProducto").value;
    const precioProducto = parseFloat(document.getElementById("precioProducto").value);

    // Crear una nueva fila de la tabla
    const nuevaFila = document.createElement("tr");
    nuevaFila.innerHTML = `
      <td>${nombreProducto}</td>
      <td>${categoriaProducto}</td>
      <td>${precioProducto.toFixed(2)}</td>
      <td><button class="seleccionar-producto">Seleccionar</button></td>
      <td><button class="eliminar-producto">Eliminar</button></td>
    `;

    // Agregar la nueva fila a la tabla de productos
    productTableBody.appendChild(nuevaFila);

    // Limpiar los campos del formulario
    document.getElementById("nombreProducto").value = "";
    document.getElementById("categoriaProducto").value = "";
    document.getElementById("precioProducto").value = "";
  });

  // Agregar un controlador de eventos para eliminar productos
  productTableBody.addEventListener("click", function (event) {
    if (event.target.classList.contains("eliminar-producto")) {
      const fila = event.target.parentElement.parentElement;
      productTableBody.removeChild(fila);
    }
  });

  // Agregar un controlador de eventos para seleccionar productos y agregarlos a la cuenta
  productTableBody.addEventListener("click", function (event) {
    if (event.target.classList.contains("seleccionar-producto")) {
      const fila = event.target.parentElement.parentElement;

      // Agregar el producto a la cuenta en el bloque3
      const nombre = fila.children[0].textContent;
      const precio = parseFloat(fila.children[2].textContent);

      // Crear una nueva entrada en la lista de cuentas con un botón de eliminación
      const listaItem = document.createElement("li");
      listaItem.textContent = `${nombre} - $${precio.toFixed(2)}`;
      const eliminarButton = document.createElement("button");
      eliminarButton.textContent = "Eliminar";
      eliminarButton.addEventListener("click", function () {
        // Al hacer clic en el botón de eliminación, eliminar el producto de la cuenta
        cuentaTotalSpan.textContent = (parseFloat(cuentaTotalSpan.textContent) - precio).toFixed(2);
        listaCuenta.removeChild(listaItem);
      });
      listaItem.appendChild(eliminarButton);

      listaCuenta.appendChild(listaItem);

      // Actualizar el total de la cuenta
      const cuentaTotal = parseFloat(cuentaTotalSpan.textContent);
      cuentaTotalSpan.textContent = (cuentaTotal + precio).toFixed(2);
    }
  });

  // Modificar el controlador de eventos para seleccionar productos
  productTableBody.addEventListener("click", function (event) {
    if (event.target.classList.contains("seleccionar-producto")) {
      const fila = event.target.parentElement.parentElement;

      // Capturar el nombre y precio del producto
      const nombre = fila.children[0].textContent;
      const precio = parseFloat(fila.children[2].textContent);

      // Llenar el formulario en el bloque3 con los datos del producto
      document.getElementById("producto").value = nombre;
      document.getElementById("precio").value = precio;
    }
  });
  
  // Obtener una referencia al campo "Monto Recibido" y al elemento "Vuelto"
  const montoRecibidoInput = document.getElementById("montoRecibido");
  const vueltoSpan = document.getElementById("vuelto");

  // Agregar un controlador de eventos al campo "Monto Recibido" para calcular el vuelto
  montoRecibidoInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      calcularVuelto();
    }
  });

  // Agregar un controlador de eventos al botón "Generar Factura" para calcular el vuelto
  const generarFactura = document.getElementById("generarFactura");
  generarFacturaButton.addEventListener("click", calcularVuelto);

  // Función para calcular el vuelto
  function calcularVuelto() {
    const cuentaTotal = parseFloat(cuentaTotalSpan.textContent);
    const montoRecibido = parseFloat(montoRecibidoInput.value);
    const metodoPago = document.getElementById("metodoPago").value;

    if (!isNaN(montoRecibido)) {
      if (montoRecibido >= cuentaTotal) {
        const vuelto = montoRecibido - cuentaTotal;
        vueltoSpan.textContent = vuelto.toFixed(2);
      } else {
        alert("El monto recibido debe ser igual o mayor que la cuenta total.");
      }
    } else {
      alert("Por favor, ingrese un monto recibido válido.");
    }
  }
});

