// Datos simulados
const medicosPorEspecialidad = {
    general: ["Dra. Martínez", "Dr. Gómez"],
    odontologia: ["Dra. López", "Dr. Ramírez"]
};

// Evento para cambiar médicos según especialidad
document.getElementById('especialidad').addEventListener('change', function () {
    const seleccion = this.value;
    const selectMedico = document.getElementById('medico');
    selectMedico.innerHTML = '<option value="">Seleccione médico</option>';

    if (medicosPorEspecialidad[seleccion]) {
        medicosPorEspecialidad[seleccion].forEach(medico => {
            const option = document.createElement('option');
            option.value = medico;
            option.textContent = medico;
            selectMedico.appendChild(option);
        });
    }
});

// Buscar disponibilidad (simulado)
document.getElementById('btnBuscarDisponibilidad').addEventListener('click', () => {
    const especialidad = document.getElementById('especialidad').value;
    const medico = document.getElementById('medico').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;

    if (!especialidad || !medico || !fecha || !hora) {
        alert("Complete todos los campos antes de buscar.");
        return;
    }

    const tabla = document.getElementById('tablaResultados');
    tabla.innerHTML = '';

    // Simula resultados
    for (let i = 0; i < 3; i++) {
        const row = document.createElement('tr');
        const horaDisponible = `${parseInt(hora.split(":")[0]) + i}:00`;

        row.innerHTML = `
            <td>${especialidad}</td>
            <td>${medico}</td>
            <td>${fecha}</td>
            <td>${horaDisponible}</td>
            <td><button class="btn btn-success btn-sm" onclick="confirmarCita('${especialidad}', '${medico}', '${fecha}', '${horaDisponible}')">Asignar</button></td>
        `;

        tabla.appendChild(row);
    }

    document.getElementById('resultadosDisponibilidad').style.display = 'block';
});

// Confirmación de cita
function confirmarCita(especialidad, medico, fecha, hora) {
    if (confirm(`¿Deseas confirmar esta cita con ${medico} el ${fecha} a las ${hora}?`)) {
        citas.push({ especialidad, fecha, hora });
        alert("¡Cita asignada exitosamente!");
        mostrarSeccion('historial');
        mostrarHistorial();
    }
}
