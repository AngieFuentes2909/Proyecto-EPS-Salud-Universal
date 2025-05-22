        const sidebar = document.getElementById('sidebar');
        const btnToggle = document.getElementById('btnToggleSidebar');
        const links = sidebar.querySelectorAll('nav a');
        const sections = document.querySelectorAll('main section');

        // Datos ejemplo para mostrar en el formulario "Mis Datos"
        const datosUsuario = {
            nombre: 'Juan Pérez',
            email: 'juan.perez@example.com',
            telefono: '3123456789',
            direccion: 'Calle Falsa 123',
            sexo: 'M',
        };

        // Array para almacenar las citas agendadas
        let citas = [
            // Ejemplo de cita previa (opcional)
            // { especialidad: 'general', fecha: '2025-05-10', hora: '14:00' }
        ];

        // Función para cargar datos en el formulario "Mis Datos"
        function cargarDatos() {
            document.getElementById('nombre').value = datosUsuario.nombre;
            document.getElementById('email').value = datosUsuario.email;
            document.getElementById('telefono').value = datosUsuario.telefono;
            document.getElementById('direccion').value = datosUsuario.direccion;
            document.getElementById('sexo').value = datosUsuario.sexo;
        }

        // Función para mostrar las citas en el historial
        function mostrarHistorial() {
            const historialDiv = document.getElementById('historialCitas');
            historialDiv.innerHTML = ''; // Limpiar contenido

            if (citas.length === 0) {
                historialDiv.innerHTML = '<p>No tienes citas agendadas.</p>';
                return;
            }

            // Ordenar citas por fecha y hora descendente para mostrar la última primero
            citas.sort((a, b) => {
                const fechaHoraA = new Date(a.fecha + 'T' + a.hora);
                const fechaHoraB = new Date(b.fecha + 'T' + b.hora);
                return fechaHoraB - fechaHoraA;
            });

            const ultimaCita = citas[0];

            historialDiv.innerHTML = `
        <p><strong>Última cita agendada:</strong></p>
        <ul>
          <li>Especialidad: ${ultimaCita.especialidad.charAt(0).toUpperCase() + ultimaCita.especialidad.slice(1)}</li>
          <li>Fecha: ${ultimaCita.fecha}</li>
          <li>Hora: ${ultimaCita.hora}</li>
        </ul>
      `;

            // Opcional: mostrar todas las citas históricas
            if (citas.length > 1) {
                historialDiv.innerHTML += '<hr><p>Historial completo de citas:</p><ul>';
                citas.forEach(cita => {
                    historialDiv.innerHTML += `<li>${cita.especialidad.charAt(0).toUpperCase() + cita.especialidad.slice(1)} - ${cita.fecha} a las ${cita.hora}</li>`;
                });
                historialDiv.innerHTML += '</ul>';
            }
        }

        // Botón para abrir/cerrar sidebar móvil
        btnToggle.addEventListener('click', () => {
            if (sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                sidebar.classList.add('closed');
                btnToggle.setAttribute('aria-expanded', 'false');
            } else {
                sidebar.classList.add('open');
                sidebar.classList.remove('closed');
                btnToggle.setAttribute('aria-expanded', 'true');
            }
        });

        // Navegación y mostrar secciones
        links.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const target = link.getAttribute('data-target');

                sections.forEach(sec => {
                    sec.hidden = sec.id !== target;
                });

                links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Cargar datos en "Mis Datos" si se selecciona esa sección
                if (target === 'misdatos') {
                    cargarDatos();
                }

                // Mostrar historial actualizado si se selecciona historial
                if (target === 'historial') {
                    mostrarHistorial();
                }

                // En móvil cerrar sidebar al seleccionar
                if (window.innerWidth < 992) {
                    sidebar.classList.remove('open');
                    sidebar.classList.add('closed');
                    btnToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Al cargar página: mostrar solo historial y sidebar acorde tamaño
        window.addEventListener('DOMContentLoaded', () => {
            sections.forEach(sec => {
                sec.hidden = sec.id !== 'historial';
            });
            mostrarHistorial();

            if (window.innerWidth >= 992) {
                sidebar.classList.remove('closed');
                sidebar.classList.remove('open');
            } else {
                sidebar.classList.add('closed');
            }
            btnToggle.setAttribute('aria-expanded', 'false');
        });

        // Ajustar sidebar al cambiar tamaño ventana
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 992) {
                sidebar.classList.remove('closed');
                sidebar.classList.remove('open');
                btnToggle.setAttribute('aria-expanded', 'false');
            } else {
                sidebar.classList.add('closed');
            }
        });

        // Validar y "guardar" cambios de formulario "Mis Datos"
        const formDatos = document.getElementById('formDatos');
        formDatos.addEventListener('submit', e => {
            e.preventDefault();

            // Validar campos con HTML5
            if (!formDatos.checkValidity()) {
                alert('Por favor complete correctamente el formulario.');
                return;
            }

            // Validar patrón del teléfono si está lleno
            const telefonoInput = document.getElementById('telefono');
            if (telefonoInput.value.trim() !== '' && !telefonoInput.checkValidity()) {
                alert('El teléfono debe contener solo números entre 7 y 15 dígitos.');
                return;
            }

            // Guardar los datos en el objeto (simulación)
            datosUsuario.nombre = document.getElementById('nombre').value.trim();
            datosUsuario.email = document.getElementById('email').value.trim();
            datosUsuario.telefono = telefonoInput.value.trim();
            datosUsuario.direccion = document.getElementById('direccion').value.trim();
            datosUsuario.sexo = document.getElementById('sexo').value;

            alert('Datos guardados con éxito. (Aquí conectas con backend para persistir)');
        });

        // Manejar formulario agendar cita
        const formAgendar = document.getElementById('formAgendar');
        formAgendar.addEventListener('submit', e => {
            e.preventDefault();

            // Validar campos
            if (!formAgendar.checkValidity()) {
                alert('Por favor complete correctamente el formulario para agendar cita.');
                return;
            }

            // Obtener valores
            const especialidad = document.getElementById('especialidad').value;
            const fecha = document.getElementById('fecha').value;
            const hora = document.getElementById('hora').value;

            // Validar fecha no sea en el pasado
            const fechaCita = new Date(fecha + 'T' + hora);
            const ahora = new Date();
            if (fechaCita < ahora) {
                alert('La fecha y hora de la cita no pueden ser anteriores a la fecha actual.');
                return;
            }

            // Agregar cita al array
            citas.push({ especialidad, fecha, hora });
            alert('Cita agendada correctamente.');

            // Resetear formulario
            formAgendar.reset();

            // Cambiar a historial y actualizarlo para que muestre la nueva cita
            sections.forEach(sec => (sec.hidden = sec.id !== 'historial'));
            links.forEach(l => l.classList.remove('active'));
            links.forEach(l => {
                if (l.getAttribute('data-target') === 'historial') l.classList.add('active');
            });
            mostrarHistorial();
        });