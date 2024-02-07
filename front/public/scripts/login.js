document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    try {
        const res = await fetch("http://localhost:3001/api/v1/registeruser-app/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            }),
        });

        const data = await res.json();

        if (res.ok) {
            console.log("Token de acceso:", data.accessToken);
            alert("Autenticación exitosa. ¡Bienvenido!");
            setTimeout(() => {
                window.location.href = '/front/public/index.html';
            }, 100); // Redirige después de 100 milisegundos 
            e.target.elements.password.type = 'password';
        } else {
            console.error("Error en la solicitud:", data.message);
            const errorElement = document.querySelector('.error');
            errorElement.classList.remove('hidden');
        }        

    } catch (error) {
        console.error("Error en la solicitud:", error.message);
    }
});
