   const pacientes = [
        {
            id: 1,
            nombre: 'Ana Torres',
            historial: [
                'Consulta General - 2025-01-15: Revisión general y control de presión arterial.',
                'Dermatología - 2025-02-20: Diagnóstico de dermatitis.',
            ]
        },
        {
            id: 2,
            nombre: 'Carlos Méndez',
            historial: [
                'Odontología - 2025-03-10: Limpieza dental.',
                'Consulta General - 2025-04-02: Alergia tratada con antihistamínicos.',
            ]
        }
    ];

    const listaPacientes = document.getElementById('listaPacientes');
    const historialClinico = document.getElementById('historialClinico');
    const nombrePaciente = document.getElementById('nombrePaciente');
    const detallesHistorial = document.getElementById('detallesHistorial');
    const btnCerrarHistorial = document.getElementById('btnCerrarHistorial');
    const links = document.querySelectorAll('.nav-link');

    function cargarPacientes() {
        listaPacientes.innerHTML = '';
        pacientes.forEach(paciente => {
            const btn = document.createElement('button');
            btn.classList.add('btn', 'btn-outline-primary', 'mb-2');
            btn.textContent = paciente.nombre;
            btn.addEventListener('click', () => {
                nombrePaciente.textContent = paciente.nombre;
                detallesHistorial.innerHTML = '';
                paciente.historial.forEach(entry => {
                    const li = document.createElement('li');
                    li.textContent = entry;
                    detallesHistorial.appendChild(li);
                });
                historialClinico.hidden = false;
            });
            listaPacientes.appendChild(btn);
        });
    }

    btnCerrarHistorial.addEventListener('click', () => {
        historialClinico.hidden = true;
    });

    links.forEach(link => {
        link.addEventListener('click', e => {
            const target = link.getAttribute('data-target');
            if (target === 'pacientes') {
                cargarPacientes();
            }
        });
    });