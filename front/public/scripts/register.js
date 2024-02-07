document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = e.target.elements.username.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const confirmPassword = e.target.elements.confirmPassword.value;

    // Validar campos vacíos
    if (!username || !email || !password || !confirmPassword) {
        alert('Por favor complete todos los campos.');
        return;
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    try {
        const res = await fetch("http://localhost:3001/api/v1/registeruser-app/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password
            }),
        });

        if (!res.ok) {
            throw new Error(`Error en la solicitud: ${res.status}`);
        }

        const data = await res.json();
        console.log("Respuesta del servidor:", data);

        // Manejar la respuesta del servidor
        if (data.accessToken) {
            alert('¡Registro exitoso!');
            // Limpiar campos
            e.target.elements.username.value = '';
            e.target.elements.email.value = '';
            e.target.elements.password.value = '';
            e.target.elements.confirmPassword.value = '';
        } else {
            alert('Error al registrar la cuenta.');
        }

    } catch (error) {
        console.error("Error en la solicitud:", error.message);
        // Manejar errores (mostrar mensaje de error, etc.)
    }
});