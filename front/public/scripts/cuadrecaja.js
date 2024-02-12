 document.addEventListener("DOMContentLoaded", function () {
                // Recuperar datos almacenados en localStorage 
                const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    
                // Calcular el total de gastos
                const totalGastos = storedProducts.reduce((total, product) => total + parseFloat(product.price), 0);
    
                const totalGastosInput = document.getElementById("total-gastos");
                totalGastosInput.value = totalGastos.toFixed(2) + "$";
            });