   // Datos simulados que vendrían del backend
        const citasDoctor = [
            {
                id: 1,
                paciente: "Carlos Mendoza",
                fecha: "2025-05-20",
                hora: "10:00 AM",
                motivo: "Consulta general",
                estado: "Pendiente"
            },
            {
                id: 2,
                paciente: "Ana Torres",
                fecha: "2025-05-20",
                hora: "11:00 AM",
                motivo: "Chequeo cardiológico",
                estado: "Pendiente"
            },
            {
                id: 3,
                paciente: "Luis Gómez",
                fecha: "2025-05-21",
                hora: "09:30 AM",
                motivo: "Revisión laboratorio",
                estado: "Confirmada"
            }
        ];

        // Manejo del menú lateral y secciones
        const sidebar = document.getElementById('sidebar');
        const btnToggleSidebar = document.getElementById('btnToggleSidebar');
        const mainContent = document.getElementById('mainContent');
        const linksNav = sidebar.querySelectorAll('nav a');
        const secciones = ['historial', 'citas', 'pacientes', 'misdatos'];

        btnToggleSidebar.addEventListener('click', () => {
            const expanded = btnToggleSidebar.getAttribute('aria-expanded') === 'true';
            btnToggleSidebar.setAttribute('aria-expanded', !expanded);
            sidebar.classList.toggle('open');
        });

        linksNav.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('data-target');

                // Marcar activo en menú
                linksNav.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Mostrar solo la sección correspondiente
                secciones.forEach(sec => {
                    const secElem = document.getElementById(sec);
                    if (sec === target) {
                        secElem.hidden = false;
                        secElem.focus();
                    } else {
                        secElem.hidden = true;
                    }
                });

                // Cerrar sidebar en móviles
                if (window.innerWidth < 992) {
                    sidebar.classList.remove('open');
                    btnToggleSidebar.setAttribute('aria-expanded', false);
                }

                // Si la sección es citas, cargar lista
                if (target === 'citas') {
                    cargarCitas();
                }
                // Si la sección es pacientes, cargar lista (opcional)
                if (target === 'pacientes') {
                    cargarPacientes();
                }
            });
        });

        // Función para cargar las citas del doctor
        function cargarCitas() {
            const divLista = document.getElementById('listaCitas');
            if (citasDoctor.length === 0) {
                divLista.innerHTML = '<p>No hay citas programadas.</p>';
                return;
            }

            let html = `<table aria-describedby="listaCitas">
            <thead>
                <tr>
                    <th>Paciente</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Motivo</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>`;

            citasDoctor.forEach(cita => {
                html += `
            <tr>
                <td>${cita.paciente}</td>
                <td>${cita.fecha}</td>
                <td>${cita.hora}</td>
                <td>${cita.motivo}</td>
                <td id="estado-${cita.id}">${cita.estado}</td>
                <td>
                    <button aria-label="Confirmar cita de ${cita.paciente}" onclick="confirmarCita(${cita.id})" class="btn btn-sm btn-success" ${cita.estado === 'Confirmada' ? 'disabled' : ''}>Confirmar</button>
                    <button aria-label="Cancelar cita de ${cita.paciente}" onclick="cancelarCita(${cita.id})" class="btn btn-sm btn-danger" ${cita.estado === 'Cancelada' ? 'disabled' : ''}>Cancelar</button>
                </td>
            </tr>`;
            });

            html += `</tbody></table>`;
            divLista.innerHTML = html;
        }

        // Confirmar cita
        function confirmarCita(id) {
            const cita = citasDoctor.find(c => c.id === id);
            if (!cita) return;
            cita.estado = "Confirmada";
            document.getElementById(`estado-${id}`).textContent = "Confirmada";
            cargarCitas();
        }

        // Cancelar cita
        function cancelarCita(id) {
            const cita = citasDoctor.find(c => c.id === id);
            if (!cita) return;
            cita.estado = "Cancelada";
            document.getElementById(`estado-${id}`).textContent = "Cancelada";
            cargarCitas();
        }

        // Carga de pacientes (simulado)
        const pacientes = [
            {
                id: 1,
                nombre: "Carlos Mendoza",
                historial: [
                    "Consulta general 2024-12-01: Control de peso",
                    "Vacunación antigripal 2024-11-15"
                ]
            },
            {
                id: 2,
                nombre: "Ana Torres",
                historial: [
                    "Chequeo cardiológico 2024-10-10",
                    "Ecografía abdominal 2024-09-05"
                ]
            }
        ];

        function cargarPacientes() {
            const divPacientes = document.getElementById('listaPacientes');
            if (pacientes.length === 0) {
                divPacientes.innerHTML = "<p>No hay pacientes registrados.</p>";
                return;
            }
            let html = '<ul class="list-group">';
            pacientes.forEach(p => {
                html += `<li class="list-group-item list-group-item-action" tabindex="0" role="button" aria-pressed="false" onclick="mostrarHistorial(${p.id})" onkeydown="if(event.key==='Enter'){mostrarHistorial(${p.id})}">
            ${p.nombre}</li>`;
            });
            html += '</ul>';
            divPacientes.innerHTML = html;
            document.getElementById('historialClinico').hidden = true;
        }

        // Mostrar historial clínico de paciente
        function mostrarHistorial(idPaciente) {
            const paciente = pacientes.find(p => p.id === idPaciente);
            if (!paciente) return;

            const divHistorial = document.getElementById('historialClinico');
            const ulDetalles = document.getElementById('detallesHistorial');
            const nombreSpan = document.getElementById('nombrePaciente');

            nombreSpan.textContent = paciente.nombre;
            ulDetalles.innerHTML = '';
            paciente.historial.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                ulDetalles.appendChild(li);
            });

            divHistorial.hidden = false;
            divHistorial.focus();
        }

        document.getElementById('btnCerrarHistorial').addEventListener('click', () => {
            document.getElementById('historialClinico').hidden = true;
            document.getElementById('listaPacientes').focus();
        });

        // Manejo del formulario Mis Datos
        const formDatos = document.getElementById('formDatos');
        const mensajeDatos = document.getElementById('mensajeDatos');

        // Simulación de carga de datos del doctor
        function cargarDatosDoctor() {
            // Estos datos podrían venir del backend
            const datos = {
                nombreDoctor: "Dr. Juan Pérez",
                emailDoctor: "juan.perez@epsuniversal.com",
                especialidad: "Medicina General",
                telefono: "3124567890"
            };

            formDatos.nombreDoctor.value = datos.nombreDoctor;
            formDatos.emailDoctor.value = datos.emailDoctor;
            formDatos.especialidad.value = datos.especialidad;
            formDatos.telefono.value = datos.telefono;
        }

        formDatos.addEventListener('submit', e => {
            e.preventDefault();
            if (!formDatos.checkValidity()) {
                mensajeDatos.textContent = "Por favor completa todos los campos requeridos correctamente.";
                mensajeDatos.style.color = "red";
                return;
            }
            // Aquí se enviaría al backend para guardar
            mensajeDatos.textContent = "Datos guardados correctamente.";
            mensajeDatos.style.color = "green";
        });

        // Al cargar la página, cargar datos y mostrar historial por defecto
        window.addEventListener('load', () => {
            cargarDatosDoctor();
            // Por defecto mostramos la sección historial y cargamos
            secciones.forEach(sec => {
                document.getElementById(sec).hidden = sec !== 'historial';
            });
            linksNav.forEach(l => l.classList.remove('active'));
            linksNav[0].classList.add('active');
        });