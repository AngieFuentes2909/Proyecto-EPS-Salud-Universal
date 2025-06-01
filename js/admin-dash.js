console.log("✅ admi-dash.js cargado correctamente");

// Función para mostrar secciones del panel
function mostrarSeccion(id) {
    ['unidades', 'doctores', 'pacientes'].forEach(sec => {
        const seccion = document.getElementById(sec);
        if (seccion)
            seccion.style.display = (sec === id) ? 'block' : 'none';
    });

    const links = document.querySelectorAll('#sidebar nav a');
    links.forEach(link => link.classList.remove('active'));

    const linkActivo = document.querySelector(`#sidebar nav a[href="#${id}"]`);
    if (linkActivo)
        linkActivo.classList.add('active');
}

// Función para generar contraseñas aleatorias
function generarPassword(idInput) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$!";
    let pass = "";
    for (let i = 0; i < 10; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById(idInput).value = pass;
}

document.addEventListener('DOMContentLoaded', function () {
    // Escuchar submit del formulario de unidades
    document.getElementById('formUnidades').addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const datos = Object.fromEntries(formData.entries());

        fetch('../controller/unidadcontroller.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                nombre: datos.nombre,
                sitio: datos.sitio,
                planta: datos.planta
                // El identificador ya lo manejas internamente en backend
            })
        })
        .then(res => res.json())
        .then(data => {
            mostrarMensaje(data.mensaje, data.exito);
            if (data.exito)
                this.reset();
        })
        .catch(err => {
            mostrarMensaje('Error en la petición: ' + err.message, false);
        });
    });
});

// Función para mostrar mensajes en pantalla
function mostrarMensaje(mensaje, exito) {
    let div = document.getElementById('mensajeUnidad');
    if (!div) {
        div = document.createElement('div');
        div.id = 'mensajeUnidad';
        div.style.marginTop = '10px';
        document.querySelector('#formUnidades').after(div);
    }
    div.textContent = mensaje;
    div.style.color = exito ? 'green' : 'red';
}

